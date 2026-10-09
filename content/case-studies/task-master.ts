import type { CaseStudy } from "@/content/work";

// Snippets are trimmed from the task-master repo; "..." marks removed lines.

export const taskMaster: CaseStudy = {
  slug: "task-master",
  title: "Task Master",
  summary:
    "A task manager built on the idea that the hard part of a to-do list isn't writing tasks down. It's doing them.",
  year: "2025 to 2026",
  role: "Solo",
  stack: [
    "Next.js",
    "TypeScript",
    "PostgreSQL",
    "Drizzle ORM",
    "Supabase Realtime",
    "NextAuth",
    "Web Push",
    "Resend",
    "Upstash Redis",
  ],
  live: "https://task-master-quick.vercel.app/",
  repo: "https://github.com/luckys-lnz/task-master",
  image: { src: "/taskmaster.png", width: 1893, height: 855 },
  sections: [
    {
      heading: "Why",
      body: [
        "Most to-do apps treat a task you keep pushing back as a reminder problem: show it again, make it redder. I wanted to treat it as information. If you've pushed something back three times, there's probably something wrong with the task, and the useful move is to find out what.",
        "So Task Master has the usual parts (priorities, subtasks, recurring tasks, list and Kanban views, a Pomodoro focus mode), plus a few that come from that idea. This page is about those, and about the bugs that taught me the most while building them.",
      ],
    },
    {
      heading: "Deferring is data",
      body: [
        "Every task has a `defer_count`. Pushing the due date later or snoozing the task counts as a deferral. On the third one, the Procrastination Shield opens and asks why, and each answer does something concrete:",
        {
          list: [
            "Too big: opens the task so you can split it into subtasks.",
            "Not sure what to do: opens the task so you can write down what done looks like.",
            "Wrong time or low energy: moves it to tomorrow.",
            "Not that important: drops it to low priority, or deletes it.",
          ],
        },
        "Acting on the answer resets the count and stores the reason in `procrastination_reason`, so the app records why a task stalled.",
      ],
    },
    {
      heading: "The bug that made everyone a procrastinator",
      body: [
        "The first version counted a deferral whenever an update included a due date. That was wrong in two ways. The task editor always resubmits the due date, even when you only changed the title. And the API stores `due_date` as a date-only midnight timestamp, with the real time of day in `end_time`, so almost any save looked like the deadline had moved later. Edit a task three times and the shield accused you of procrastinating.",
        "The fix compares the actual deadline before and after, using the same precedence the overdue check uses: `end_time` if there is one, otherwise `due_date`.",
        {
          file: "components/dashboard/comprehensive-dashboard.tsx",
          lang: "ts",
          code: `
const previousMoment = task?.endTime
  ? new Date(task.endTime).getTime()
  : task?.dueDate ? new Date(task.dueDate).getTime() : null
const nextMoment = updates.endTime
  ? new Date(updates.endTime).getTime()
  : updates.dueDate ? new Date(updates.dueDate).getTime() : null

const isDueDatePushedBack =
  previousMoment !== null && nextMoment !== null && nextMoment > previousMoment
const isNewSnooze = !!updates.snoozedUntil
const isDeferral = isDueDatePushedBack || isNewSnooze

if (isDeferral && updates.status !== "COMPLETED" && task) {
  const newDeferCount = (task.deferCount ?? 0) + 1
  updates = { ...updates, deferCount: newDeferCount }
  if (newDeferCount >= 3) setShieldTask({ ...task, deferCount: newDeferCount })
}`,
        },
        "The same commit routed the main edit modal through this path, because it had been bypassing deferral tracking entirely.",
      ],
    },
    {
      heading: "Overdue is a state, not a colour",
      body: [
        "A task moves through `PENDING`, `COMPLETED` and `OVERDUE`, and the server decides when it's overdue. It isn't a red label worked out in the browser, so your phone, your laptop, a push notification and a collaborator all agree. A sweep marks tasks overdue on a cron and again before the task list is returned, so the list is never stale.",
        "Deciding \"past due\" has to handle two kinds of task. Newer ones have `end_time`, a real UTC timestamp. Older ones only have a date and an optional time-of-day string. The sweep handles both in one SQL condition that checks `end_time` first, and falls back to the date and time only for older tasks.",
        "By default, an overdue task locks. You can complete it or duplicate it, but you can't quietly move the deadline and pretend it was never late:",
        {
          file: "lib/task-utils.ts",
          lang: "ts",
          code: `
export function isTaskLocked(task: {
  status: string
  locked_after_due: boolean
  recurrence_type?: string | null
}): boolean {
  if (task.recurrence_type) return false          // recurring → never locked
  return task.status === "OVERDUE" && task.locked_after_due
}

export function validateTaskCanBeUpdated(task: ...): void {
  if (isTaskLocked(task)) {
    throw new Error(
      "This task is locked because it is overdue. Complete or duplicate it instead."
    )
  }
}`,
        },
      ],
    },
    {
      heading: "Recurring tasks that duplicated themselves",
      body: [
        "Recurring tasks don't go overdue. When one passes its due date, the sweep completes it and creates the next occurrence. The first version moved the due date forward by one interval. For a daily task nobody had opened in a week, that new occurrence was still in the past.",
        "That turned into a loop. The new task was immediately past due, so it got completed. That change fired a Realtime event, the open tab refetched the task list, the refetch ran the sweep again, and the sweep created another occurrence. Each lap made a new task.",
        "Two changes fixed it. The next occurrence now jumps straight to the first future date, with start and end times moved by the same number of steps. And completing the old one is a conditional update that claims it, so if two requests run the sweep at once, only one creates the next task:",
        {
          file: "lib/task-utils.ts",
          lang: "ts",
          code: `
function advanceToFuture(base: Date | null, recurrenceType: string, interval: number, now: Date) {
  if (!base) return { date: null, steps: 0 }
  let d = new Date(base)
  let steps = 0
  while (d <= now) {
    d = advanceDate(d, recurrenceType, interval)
    steps++
  }
  return { date: d, steps }
}

// ...

for (const task of pastDueRecurring) {
  const { date: nextDue, steps } = advanceToFuture(task.due_date ?? now, rt, ri, now)
  const nextStart = advanceBySteps(task.start_time, rt, ri, steps)
  const nextEnd   = advanceBySteps(task.end_time,   rt, ri, steps)

  // Only one concurrent caller gets a row back here. The other sees
  // status already COMPLETED and skips the insert.
  const claimed = await db
    .update(tasks)
    .set({ status: "COMPLETED", completed_at: now, updated_at: now })
    .where(and(eq(tasks.id, task.id), eq(tasks.status, "PENDING")))
    .returning({ id: tasks.id })

  if (claimed.length === 0) continue

  await db.insert(tasks).values({ ...nextOccurrence, due_date: nextDue,
    start_time: nextStart, end_time: nextEnd, parent_task_id: task.id })
}`,
        },
        "The manual \"mark complete\" path in the API had the same single-step bug and got the same fix.",
      ],
    },
    {
      heading: "Live sync without polling",
      body: [
        "Each signed-in tab subscribes to Postgres changes on the user's own tasks and on the collaborator table, through Supabase Realtime. A change event doesn't patch local state. It triggers a quiet refetch, so the server stays the only source of truth. Coming back to a tab also refetches once, in case the socket dropped while it was in the background.",
        {
          file: "hooks/use-db-tasks.ts",
          lang: "ts",
          code: `
const channel = supabase
  .channel(\`tasks-user-\${userId}\`)
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "tasks", filter: \`user_id=eq.\${userId}\` },
    () => silentRefetch()
  )
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "task_collaborators", filter: \`user_id=eq.\${userId}\` },
    () => silentRefetch()
  )
  .subscribe()`,
        },
        "That refetch-on-event design is also what made the recurring-task loop possible, which is why the fix had to be in the sweep and not in the client.",
      ],
    },
    {
      heading: "Sharing without an account",
      body: [
        "Any task can get a read-only public link through a unique `share_token`. For real collaboration, you invite someone by email to a single task. They don't need an account yet. The invite stores their email and a unique token, and accepting it requires signing in. An invite that's already been accepted returns 410, and you can't accept an invite to your own task.",
        "Collaborators can be assigned subtasks, and when one of them makes a meaningful change, the owner gets a push notification and any open tabs refresh.",
      ],
    },
    {
      heading: "Reminders and accounts",
      body: [
        "Reminders for due, overdue and start times arrive as web push through a service worker (VAPID), with snooze and mute per task. Verification, password reset and invites go out by email through Resend.",
        "Sign-in is NextAuth with email and password or Google. Accounts lock for 30 minutes after five failed attempts, and sensitive routes are rate-limited with Upstash Redis.",
      ],
    },
  ],
};
