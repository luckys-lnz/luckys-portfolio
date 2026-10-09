import type { CaseStudy } from "@/content/work";

// Snippets are trimmed from the forest repo; "..." marks removed lines.

export const forest: CaseStudy = {
  slug: "forest",
  title: "Forest",
  summary:
    "Each person picks a mood. Forest finds the dinner in the middle, using what other couples actually ate and loved.",
  year: "2026",
  role: "Solo",
  stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4"],
  live: "https://forestpip.vercel.app/",
  image: { src: "/forest.png", width: 1898, height: 961 },
  sections: [
    {
      heading: "The idea",
      body: [
        "Deciding what to eat as a couple is a small negotiation that happens most days. Forest turns it into a match. Each of you picks a mood, and it ranks meals by how well they suit both moods, using what couples who felt the same way logged and rated. There's also a shop and a journal, but the matchmaker is the product.",
        "Forest is in beta. The community numbers come from a preview dataset, and the site says so wherever they appear. More on that below.",
      ],
    },
    {
      heading: "Ranking for two people",
      body: [
        "The obvious way to score a dish for two people is to average how much each of you would like it. That's wrong for this problem. A dish one of you loves (1.0) and the other can't stand (0.2) averages 0.6, the same as a dish you both feel fine about. For a shared dinner, the second one is the better pick.",
        "So the fit is the geometric mean instead. The same 1.0 and 0.2 come out at about 0.45, while 0.6 and 0.6 stays at 0.6. A strong objection from either side pulls the score down a lot more than strong enthusiasm pushes it up.",
        {
          file: "lib/discover/rank.ts",
          lang: "ts",
          code: `
/**
 * Rank discoveries for two moods.
 * - Fit is the geometric mean of both partners' affinity, so a dish one of
 *   you loves and the other can't stand ranks below one you both like.
 * - Crowd confidence nudges by repeat rate and penalises dishes couples split on.
 * - Popularity is a light tiebreaker only, so niche finds can still win.
 */
export function rankMatches(a: MoodId, b: MoodId, filters: Filters = defaultFilters): Match[] {
  return discoveries
    .filter((d) => passes(d, filters))
    .map((d): Match => {
      const fitA = d.affinity[a];
      const fitB = d.affinity[b];
      const confidence = (0.75 + 0.25 * d.signals.again) * (1 - 0.25 * d.signals.split);
      const popularity = 0.92 + 0.08 * (Math.log10(d.signals.couples) / Math.log10(MAX_COUPLES));
      return {
        discovery: d,
        score: Math.sqrt(fitA * fitB) * confidence * popularity,
        fitA,
        fitB,
        verdict: verdictFor(fitA, fitB),
        likeYou: Math.round(d.signals.couples * fitA * fitB * 0.12),
      };
    })
    .sort((x, y) => y.score - x.score);
}`,
        },
        "The other two factors carry less weight. Confidence rewards dishes couples said they'd have again, and penalises ones where one partner loved it and the other didn't. Popularity only ranges from 0.92 to 1.0 on a log scale, so it breaks ties without letting the most-logged dish win everything.",
        "Each match also gets a verdict, so the result explains itself: \"You both want this\" when both fits are 0.7 or higher, \"Right in the middle\" when they're within 0.2 of each other, and otherwise \"Leans Sam's way\", using the names you typed. The switch over verdicts ends in `assertNever`, so adding a verdict without a label is a compile error.",
      ],
    },
    {
      heading: "A match is a link",
      body: [
        "The state of a match (both moods, both names and the filters) lives in the URL, so you can send it to the other person or come back to it later. The parser treats the query string as untrusted input. Anything that isn't a known mood or setting falls back to a default, and names are stripped to letters, numbers and a few safe characters, then capped at 16:",
        {
          file: "lib/discover/params.ts",
          lang: "ts",
          code: `
/** Read discover state from URL search params (shared links). Never trusts input. */
export function parseDiscoverParams(params: SearchParams): DiscoverState {
  const get = (k: string) => firstParam(params[k]);
  const a = get("a");
  const b = get("b");
  const setting = get("setting");
  const price = Number(get("price"));
  return {
    a: isMoodId(a) ? a : null,
    b: isMoodId(b) ? b : null,
    nameA: sanitizeName(get("na")) ?? "You",
    nameB: sanitizeName(get("nb")) ?? "Them",
    filters: {
      setting: isSettingId(setting) ? setting : "any",
      vegetarian: get("veg") === "1",
      maxPrice: price === 1 || price === 2 ? price : 3,
    },
  };
}

function sanitizeName(v: string | undefined): string | null {
  const clean = v?.replace(/[^\\p{L}\\p{N} '\\-]/gu, "").trim().slice(0, 16);
  return clean || null;
}`,
        },
        "The inverse, `toDiscoverQuery`, leaves out anything at its default value, so a shared link stays short.",
      ],
    },
    {
      heading: "Types that can't mix up money",
      body: [
        "Prices are integer cents everywhere, and the type system enforces it. `Cents` is a branded number, so a plain number (a quantity, a float from a calculation) can't be passed where money is expected without going through `cents()`, which rounds. Slugs are branded by kind, so a product slug can't be used to look up an article.",
        {
          file: "lib/types.ts",
          lang: "ts",
          code: `
declare const brand: unique symbol;

/** Nominal typing on top of a structural type. */
export type Brand<T, B extends string> = T & { readonly [brand]: B };

/** Money is always integer cents. Never a float, never a bare number. */
export type Cents = Brand<number, "Cents">;
export const cents = (n: number): Cents => Math.round(n) as Cents;

/** A URL-safe identifier for a given kind of record. */
export type Slug<Kind extends string> = Brand<string, \`Slug:\${Kind}\`>;

/** Explicit success/failure without throwing across boundaries. */
export type Result<T, E = string> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: E };`,
        },
        "Functions that can fail in expected ways, like pricing an order, return a `Result` instead of throwing, so the caller has to handle the failure case to get at the value.",
      ],
    },
    {
      heading: "Checkout trusts the server",
      body: [
        "The cart lives in the browser, but the browser's prices are never used. At checkout, the server re-prices every line from the catalog. Unknown products are dropped, and sold-out items or quantities over the remaining stock are reported back by name instead of being silently charged or removed:",
        {
          file: "lib/checkout.ts",
          lang: "ts",
          code: `
/**
 * Re-price a cart on the server from the catalog. Client prices are never
 * trusted; sold-out and unknown items are reported back, not silently charged.
 */
export function priceOrder(items: unknown): Result<PricedOrder> {
  if (!isCartLines(items) || items.length === 0) return err("Your cart is empty.");
  const lines = resolveLines(items);
  const problems = lines
    .filter((l) => !l.available || l.qty > l.maxQty)
    .map((l) => \`\${l.product.name} (\${l.variant.label}) \${
      l.available ? \`only has \${l.maxQty} left\` : "has sold out"
    }.\`);
  if (problems.length) return err(problems.join(" "));
  return ok({ lines, totals: totals(lines), hasGift: lines.some((l) => l.variant.stock === null) });
}`,
        },
        "No payment provider is connected yet, and the code is built so that can't be hidden. The default mode returns a confirmation that the UI labels as a preview. Switching the deploy to live mode without wiring a provider doesn't fall through to a fake success. It returns a 503:",
        {
          file: "app/api/checkout/route.ts",
          lang: "ts",
          code: `
const priced = priceOrder(body.value.items);
if (!priced.ok) return NextResponse.json({ error: priced.error }, { status: 409 });

const errors = validateCheckout(details, { physical: totals.physical, hasGift });
if (hasErrors(errors)) {
  return NextResponse.json({ error: "Check the highlighted fields.", errors }, { status: 422 });
}

if ((process.env.CHECKOUT_MODE ?? "preview") === "live") {
  return NextResponse.json(
    { error: "Card payments aren't switched on yet. Nothing has been charged." },
    { status: 503 },
  );
}`,
        },
      ],
    },
    {
      heading: "Honest numbers",
      body: [
        "In beta, the community numbers come from a preview dataset. One flag controls that, and every place that shows community figures (the home page, the menu board, the matchmaker and the footer) checks it and says so:",
        {
          file: "lib/site.ts",
          lang: "ts",
          code: `
/**
 * Forest is in beta. Community figures on the site come from a preview
 * dataset (lib/data/discoveries.ts). While this is true, every surface that
 * shows community numbers says so. Flip to false once figures come from
 * the live signals API.
 */
previewData: true,`,
        },
        "Testimonials work the same way. The type for a couple's note requires a consent reference, and the list is empty, because nobody has sent one yet. Until somebody does, the home page asks couples for their notes instead of showing invented quotes:",
        {
          file: "lib/data/notes.ts",
          lang: "ts",
          code: `
export type TableNote = {
  readonly id: string;
  readonly quote: string;
  /** First names or initials, as the couple asked to be credited. */
  readonly credit: string;
  readonly dish?: string;
  readonly consentRef: string;
};

export const tableNotes: readonly TableNote[] = [];`,
        },
      ],
    },
  ],
};
