# Living Arts — plant catalogue

Next.js 16 + Payload CMS 3 + Postgres. The public catalogue and the admin run from
this one project.

- Catalogue → http://localhost:3000
- Back office → http://localhost:3000/admin

## Running it

Postgres must be running. You only ever need this once — it then starts itself
automatically each time you log in:

    brew services start postgresql@18

Then, from this folder:

    pnpm dev

That's it — http://localhost:3000. Stop it with Ctrl+C.

**First time only:** go to http://localhost:3000/admin and it will ask you to create
an admin account. That email + password is how you log in from then on.

## Other commands

| Command | What it does |
|---|---|
| `pnpm dev` | Start the site + admin locally |
| `pnpm seed` | Wipe the catalogue and reload the 7 starter plants |
| `pnpm build` | Production build |
| `pnpm generate:types` | Regenerate TypeScript types after changing a collection |

`pnpm seed` **deletes all plants, categories and photos** before reloading. Don't run
it once you've added real plants of your own.

## Where things live

    src/collections/Plants.ts      the plant fields (name, origin, best growth, price…)
    src/collections/Categories.ts  the filter chips
    src/collections/Media.ts       photo uploads + auto-resizing
    src/globals/Settings.ts        shop name, hero image, WhatsApp number, currency, footer

    src/app/(frontend)/page.tsx                  the catalogue grid
    src/app/(frontend)/plants/[slug]/page.tsx    a single plant page
    src/components/ds/                           design system components
    src/components/ThemeToggle.tsx               light / dark switch
    src/components/Reveal.tsx                    reveal-on-scroll wrapper
    src/styles/tokens.css                        all colours for both modes

    src/seed/data.ts               the starter plants

Uploaded photos are written to `media/` in this folder.

## Adding a plant

Back office → **Plants** → **Create New**. Two tabs:

- **Plant** — name, botanical name, photo, gallery, origin, best growth, price, stock, categories
- **Conditions** — light, humidity, temperature, growth, difficulty (these fill the spec tiles)

Stock of 3 or fewer automatically shows the "Limited" badge. Leave the slug blank and
it's generated from the name.

**Photos should be cut out — transparent PNG, no background.** Plants sit on a plain
panel with no card or border around it — minimal light grey in light mode, near-black
grey in dark mode. A photo carrying its own background will show as a rectangle on
top of that panel. The panel colour is `--bed` in `src/styles/tokens.css`.

Uploads are resized by width only and never cropped, so nothing clips a leaf.

## Light and dark mode

Light is what a new visitor sees. The sun/moon switch in the header flips it and
remembers the choice; a script in `<head>` applies it before the page paints, so
there's no white flash for a dark-mode visitor.

Every colour for both modes lives in one file: `src/styles/tokens.css`. Change a
value there and it changes everywhere.

One rule worth keeping: the logo chartreuse `#B8CF3B` is only 1.75:1 against white,
so it is used as a **fill** (badges, dark-mode buttons) and never as text on a light
background. Text-green on light is `#4F6E10`.

## The hero image

Back office → **Settings** → **Hero image**. Landscape, 2000px wide or more. Leave it
empty and a dark green wash shows instead.

The header sits **on** the hero — the photo runs behind both, and a top-to-bottom
scrim over the header band keeps the menu readable on any photo. Because of that the
hero is dark in light mode too. On every other page the header is an ordinary one
with a hairline under it.

Compose the photo with its subject on one side; the headline sits on the left.

The starter hero is `src/seed/images/hero-shield-aralia.jpg`.

## Motion

The hero headline rises in line by line, the supporting copy drifts up out of a
blur, and sections and cards reveal as you scroll to them. It is all CSS plus one
IntersectionObserver (`src/components/Reveal.tsx`) — no animation library, nothing
extra to download. The choreography is lifted from the Living Arts motion study.

Every effect collapses to a plain fade for anyone with "reduce motion" turned on.

**The hero headline breaks on line breaks.** Settings → Tagline is a multi-line box;
each line you type becomes its own rising line. Three short lines read best.

Timings live at the bottom of `src/app/(frontend)/styles.css`.

## Adding a new field

Fields are defined in code, not in the admin UI. To add one, edit the relevant file in
`src/collections/`, then run `pnpm generate:types`. The dev server picks it up on save.

## Deploying to Dokploy

Not set up yet. When you get there: local dev uses Postgres "push" mode, which changes
the database schema automatically. Production needs real migrations instead —
`pnpm payload migrate:create` then `pnpm payload migrate` on deploy. A `Dockerfile` and
`docker-compose.yml` came with the template as a starting point.
