import type { CaseStudy } from "@/content/work";

// Snippets are trimmed from the Sikakoraa repo; "..." marks removed lines.

export const sikakoraa: CaseStudy = {
  slug: "sikakoraa",
  title: "Sikakoraa",
  summary:
    "Booking pages for service businesses in Kenya. Customers choose a service, pick a time and pay a deposit by M-Pesa or card. The business is paid out to M-Pesa or a bank account when the job is done.",
  year: "2025 to now",
  role: "Built with deantosh. I did the payment reliability, job queue and booking lifecycle work described here.",
  stack: [
    "Next.js",
    "TypeScript",
    "Supabase (Postgres, RLS, Auth)",
    "IntaSend",
    "Resend",
    "Upstash Redis",
    "Vercel Cron",
  ],
  live: "https://sikakoraa.com",
  image: { src: "/sikakoraa.png", width: 1898, height: 961 },
  sections: [
    {
      heading: "Where it started",
      body: [
        "Sikakoraa started as booking and payment automation for small service businesses: barbers, salons, fitness trainers, tailors, photographers. The first version targeted Ghana and used Paystack. In mid-2026 it moved to Kenya and IntaSend, so customers pay a deposit by mobile money and businesses are paid out to M-Pesa or a bank account once the job is done.",
        "The platform holds customers' deposits until a job is done, so most of the hard problems are in the payment code. That's what this page is about.",
      ],
    },
    {
      heading: "What was broken",
      body: [
        "The first IntaSend integration worked on the happy path. Off the happy path, there were three ways to lose or duplicate money:",
        {
          list: [
            "Settling a payment was two separate writes: mark the payment paid, then mark the booking paid. A crash between them left a paid payment on an unpaid booking, and an \"already paid\" early return meant nothing ever repaired it.",
            "A payout was marked `sent` the moment IntaSend accepted the request. But IntaSend only queues it at that point (status `BP101`), and the transfer can still fail later (`TF106`). Failed payouts were never retried, and a crash mid-call left a payout stuck in `processing` forever.",
            "Webhook errors were swallowed with a 200 so IntaSend wouldn't retry. Any transient failure meant the event was gone for good.",
          ],
        },
        "The fix was one migration and a rewrite of the payment path, in a single commit: \"Make the payment path crash-safe and self-healing\".",
      ],
    },
    {
      heading: "Store the webhook first",
      body: [
        "For a collection event, the webhook now does three things in order: authenticate, write the event to a `payment_events` table, then process it. Because the event is written first, a crash during processing can't lose it. A redelivered event maps to the same key, so it's stored once.",
        {
          file: "app/api/payments/intasend/webhook/route.ts",
          lang: "ts",
          code: `
// The same IntaSend event redelivered maps to the same key. A different
// state for the same invoice (PENDING → COMPLETE) is a different event.
const eventKey = \`\${invoiceId ?? "-"}:\${apiRef ?? "-"}:\${state ?? "-"}\`;

const { data: inserted, error: insertError } = await admin
  .from("payment_events")
  .upsert(
    { provider: "intasend", event_key: eventKey, api_ref: apiRef,
      invoice_id: invoiceId, state, payload: sanitizedPayload },
    // Redelivery of a known event must not reset its status/attempts.
    { onConflict: "provider,event_key", ignoreDuplicates: true },
  )
  .select("id, provider, api_ref, invoice_id, state, status, attempts");

if (insertError) {
  // We couldn't make the event durable. Ask IntaSend to redeliver.
  return NextResponse.json({ error: "Temporarily unavailable" }, { status: 503 });
}

// ...

const result = await processPaymentEvent(event);
if (result === "failed") {
  return NextResponse.json({ error: "Processing failed; please retry" }, { status: 500 });
}
return NextResponse.json({ ok: true });`,
        },
        "The response is honest now. If processing fails, IntaSend gets a 500 and redelivers. Separately, a reconcile cron replays any event still marked `received` or `failed`.",
        "Two smaller things in the same route: the shared webhook secret is compared in constant time and stripped from the payload before it's stored, and if the secret isn't configured in production, the route refuses everything with a 503. An unauthenticated payment webhook is worse than a paused one, because the cron still settles payments while it's paused.",
      ],
    },
    {
      heading: "One function settles a payment",
      body: [
        "A payment can be confirmed by the webhook, by the customer landing back on the callback page, or by the reconcile cron asking IntaSend directly. Those can race. So all three call the same Postgres function, which locks the payment row, then the booking row, and does everything in one transaction.",
        {
          file: "scripts/074_payment_reliability.sql",
          lang: "sql",
          code: `
create or replace function public.settle_collected_payment(...)
returns table (result_outcome text, result_booking_id uuid, result_amount bigint)
language plpgsql
as $$
begin
  select * into v_payment from public.payments where id = p_payment_id for update;

  -- Idempotency: terminal "money received" states are never re-settled.
  if v_payment.status in ('paid', 'held', 'refunded', 'completed', 'needs_review') then
    return query select 'already_settled', v_payment.booking_id, v_payment.deposit_amount;
    return;
  end if;

  select * into v_booking from public.bookings where id = v_payment.booking_id for update;

  if coalesce(v_booking.commitment_paid, false) then
    -- Another checkout attempt already paid this booking.
    v_reason := 'duplicate_payment';
  elsif lower(coalesce(v_booking.status, '')) <> 'accepted' then
    -- The booking was cancelled or expired while the customer was paying.
    -- Don't revive it; flag the money for a refund decision instead.
    v_reason := 'booking_not_payable:' || coalesce(v_booking.status, 'null');
  end if;

  -- ... reason set: payment -> needs_review, return 'needs_review'

  update public.payments set status = 'paid', ... where id = p_payment_id;
  update public.bookings set commitment_paid = true, status = 'commitment_paid', ...
   where id = v_payment.booking_id;

  return query select 'settled'::text, v_payment.booking_id, v_payment.deposit_amount;
end;
$$;`,
        },
        "Only the caller that gets back `settled` sends the confirmation, so the customer hears about their payment exactly once, however many paths raced to report it. Money that arrived but shouldn't settle the booking, like a second payment for the same booking, isn't dropped. It goes to `needs_review` with a reason, for a person to refund or apply.",
        "The function is callable by the server only. Execute is revoked from the `anon` and `authenticated` roles, since it skips business rules if you call it directly.",
      ],
    },
    {
      heading: "Paying the business",
      body: [
        "When a booking is completed, the business is paid straight away. The payout is one IntaSend transfer for everything the business is owed at that moment, usually just that booking. In the code this is a batch, and the batch's id is the transfer's idempotency key:",
        {
          file: "lib/payments/payout-batches.ts",
          lang: "text",
          code: `
completed ─▶ releaseBookingPayout ─▶ open_payout_batch ─▶ submit ─▶ submitted ─▶ sent
                                           │                 │             │
                                           ▼                 ▼             ▼
                                  awaiting_approval   failed (retry)   needs_review
                                  (above threshold:   with backoff,
                                   an admin approves)  new batch/key)`,
        },
        "Opening a batch is one Postgres function. It takes an advisory lock for the business, refuses to open a second batch while one is still open (a partial unique index backs that up), and claims each booking with the same locked claim that snapshots the amount due. A booking can only be in one payout, and every retry pays the amount that was first calculated. Bookings that complete while a transfer is in flight wait, and are paid as soon as that transfer is confirmed sent. A daily reconcile run catches anything the immediate path missed.",
      ],
    },
    {
      heading: "Never paying twice",
      body: [
        "`send-money/initiate` only queues a transfer (status `BP101`). It completes or fails later (`TS100` or `TF106`), so a 2xx means submitted, not paid. And a request can time out after IntaSend has already queued the transfer.",
        "The first version sent transfers without an idempotency key, so an unknown outcome always went to a person to check by hand. Now every transaction in the request carries an `idempotency_key`, and IntaSend refuses a repeat of the same key as a duplicate. That changes what each answer means, so the submit call returns four outcomes, not a boolean:",
        {
          file: "lib/payments/intasend-payouts.ts",
          lang: "ts",
          code: `
try {
  const resp = await intasendPost("/api/v1/send-money/initiate/", {
    provider,
    currency: input.currency,
    requires_approval: "NO",
    batch_reference: input.idempotencyKey,
    transactions: [transaction],
  }, { auth: "secret", timeoutMs: 20_000 });
  return { kind: "submitted", trackingId: resp?.tracking_id ?? resp?.file_id ?? null };
} catch (error) {
  // A duplicate is a 4xx too, but it means the transfer EXISTS: never
  // treat it as "refused, safe to retry".
  if (isDuplicateTransferError(error)) return { kind: "duplicate" };
  if (error instanceof IntaSendError && error.isDefinitiveRejection) {
    return { kind: "rejected", error: error.message };
  }
  return { kind: "ambiguous", error: error instanceof Error ? error.message : String(error) };
}`,
        },
        {
          list: [
            "Submitted or duplicate: the transfer exists. Wait for IntaSend to say how it ended.",
            "Rejected: IntaSend refused it, so no money moved. Retry later as a new batch with a new key, backing off from 15 minutes up to 12 hours, and hand it to a person after six attempts.",
            "Ambiguous (a timeout or 5xx): send it again with the same key, twice in the request and then on the reconcile run. If the first one got through, IntaSend answers duplicate and nothing is paid twice.",
          ],
        },
        "IntaSend's docs don't say how long a key is remembered, so a batch that still hasn't been confirmed after 48 hours goes to a person instead of being resent.",
        "The webhook now handles payout events as well as collections, told apart by `topic`. A `send_money_event` isn't taken on its word: the handler looks the transfer up through `send-money/status` before settling anything, and a cron polls submitted transfers in case an event never arrives. Because of that poll, a payout event that fails to apply is still acknowledged with a 200: IntaSend disables an endpoint that keeps failing, which would stop collection events too.",
      ],
    },
    {
      heading: "Checks before money moves",
      body: [
        "The payout code checks a few things before every transfer. The first is there so that someone who takes over a business's account can't redirect its money before the owner sees the security email:",
        {
          list: [
            "A payout account changed in the last 48 hours isn't paid. The change time is set by a database trigger whenever the M-Pesa number or bank account changes, and browser clients can't write it.",
            "If the account changed after a batch was prepared (an approval can come days later), the batch goes to a person instead of being sent.",
            "Each business has a daily cap, counted on the Nairobi calendar day across all of that day's batches. Batches over an approval threshold wait for an admin.",
            "The batch amount is checked against the bookings it pays, minus any recovered transfer fees, right before the call goes out.",
          ],
        },
        "IntaSend's transfer fee is the business's. It's recorded in a `payout_ledger` table when a transfer completes and taken from the next payout, never leaving less than the minimum payout. Every step (batched, held, approved, submitted, sent, failed) is written to `payout_audit`, which a trigger makes append-only.",
      ],
    },
    {
      heading: "Two people, one booking",
      body: [
        "A customer cancels at the same moment the business accepts, or the deposit settles while someone is rescheduling. Every booking change goes through one database function, and the update only applies if the booking is still in the status the route checked:",
        {
          file: "scripts/100_booking_lifecycle.sql",
          lang: "sql",
          code: `
update bookings b set
  status = case when p_patch ? 'status' then p_patch->>'status' else b.status end,
  -- ...
  updated_at = now()
where b.id = p_booking_id and b.status = p_from_status;

get diagnostics v_count = row_count;
return v_count > 0;`,
        },
        "If nothing was updated, someone else got there first, and the route says so instead of overwriting their change:",
        {
          file: "app/api/bookings/cancel/route.ts",
          lang: "ts",
          code: `
// Conditional on the status we validated: if the booking moved on in the
// meantime (e.g. the deposit settled), nothing is cancelled.
const cancelled = await applyBookingChange(admin, {
  bookingId: booking.id,
  from: booking.status,
  actor: { role, userId: user.id },
  patch: { status: "cancelled", cancelled_by: role, cancelled_at: new Date().toISOString() },
});
if (!cancelled) {
  return NextResponse.json(
    { error: "This booking was just updated. Refresh to see its latest state." },
    { status: 409 },
  );
}`,
        },
        "The same function only accepts a fixed list of columns, a trigger refuses any status move the lifecycle doesn't allow, and another trigger writes every change to a `booking_events` table in the same transaction, with who did it. That holds whether the write comes from a route, a cron, or someone in the SQL editor. A test fails if the TypeScript copy of the lifecycle drifts from the SQL one.",
      ],
    },
    {
      heading: "One definition of a taken slot",
      body: [
        "The list of statuses that hold a time slot used to be written out twice: in the database trigger that enforces capacity, and in the TypeScript that shows customers free slots. If the two drifted, customers would be offered a slot that then failed at checkout. Now the list exists once, as a SQL function, and a generated column keeps every booking's answer up to date:",
        {
          file: "scripts/084_booking_holds_slot.sql",
          lang: "sql",
          code: `
create or replace function public.booking_status_holds_slot(p_status text)
returns boolean language sql immutable as $$
  select lower(coalesce(p_status, '')) in (
    'request_sent', 'pending', 'accepted',
    'commitment_paid', 'completion_requested', 'overdue'
  );
$$;

alter table public.bookings
  add column if not exists holds_slot boolean
  generated always as (public.booking_status_holds_slot(status)) stored;`,
        },
        "The capacity check counts overlapping bookings where `holds_slot` is true. Two bookings with different start times can still overlap, so a row lock isn't enough. Before counting, the trigger takes a transaction-level advisory lock for that business and service, which makes every schedule write for that service wait its turn:",
        {
          file: "scripts/084_booking_holds_slot.sql",
          lang: "sql",
          code: `
perform pg_advisory_xact_lock(hashtext(new.business_id::text || ':' || new.service_id::text));

select count(*) into overlap_count
from public.bookings b
where b.business_id = new.business_id
  and b.service_id = new.service_id
  and b.id <> new.id
  and b.holds_slot
  and tstzrange(b.scheduled_start, b.scheduled_end)
      && tstzrange(new.scheduled_start, new.scheduled_end);

if overlap_count >= cap then
  raise exception 'Service capacity exceeded for this timeslot';
end if;`,
        },
      ],
    },
    {
      heading: "An email never fails a request",
      body: [
        "Notifications used to be sent inside the request. A slow email provider slowed the request down, a failed send was logged and lost, and an email failing after a booking had been saved could show the user an error for something that had actually worked.",
        "Now a notification is one row in a `jobs` table in Postgres. A worker picks it up right after the response, and a cron sweeps anything left over. Workers on many serverless instances claim jobs with `FOR UPDATE SKIP LOCKED`, so they never take the same job and never wait on each other:",
        {
          file: "scripts/075_jobs_queue.sql",
          lang: "sql",
          code: `
with picked as (
  select id
    from public.jobs
   where (status = 'queued' and run_at <= now())
      or (status = 'running' and lease_expires_at < now())
   order by run_at
   limit greatest(p_limit, 0)
   for update skip locked
)
update public.jobs j
   set status = 'running',
       attempts = j.attempts + 1,
       locked_by = p_worker,
       lease_expires_at = now() + make_interval(secs => p_lease_seconds)
  from picked
 where j.id = picked.id
returning j.*;`,
        },
        "Each job has a lease, so a crashed worker's job becomes claimable again. A job whose lease expired on its last attempt crashed its worker every time, so it's marked dead instead of being picked up forever. Delivery is at-least-once, and idempotency keys at three levels (the job, the in-app notification, and Resend's own key) make a retry harmless.",
        "Payouts don't use this queue. A generic queue retries any failure the same way, and a payout needs to know which failures are safe to retry, as described above.",
      ],
    },
    {
      heading: "Running it",
      body: [
        "Six daily cron jobs expire stale requests, reconcile payments, sweep the job queue, send reminders, follow up on finished jobs and email the admins when something needs a human. Each one records a heartbeat, so a cron that quietly stops running becomes an alert too.",
        "A deep health check covers the database, the payment provider and that same needs-a-human list, for an uptime monitor to poll. CI runs the type check, Vitest unit tests and a production build on every pull request, and the main flows have Playwright end-to-end tests.",
      ],
    },
  ],
};
