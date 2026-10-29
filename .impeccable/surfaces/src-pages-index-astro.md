---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/pages/projects/[slug].astro","src/pages/projects.astro","src/pages/blog.astro","src/pages/blog/[slug].astro","src/pages/404.astro"]
---

Scope: the live coredev.uk site, every route, rebuilt in Meridian. The homepage is in Experience mode; the write-ups, the posts and the indexes are in Read mode. It replaces the navy world. The mockup in `.impeccable/mocks/meridian/` was the reference.

Audience and job: as PRODUCT.md. A visitor should come away with an accurate picture of who Paul is, what he has built, and how to reach him.

Constraints: copy as on the live site, with microcopy edits only and no new claims. The user dropped the mockup's day arc and every clock or time-of-day indicator. The palette, family, radii and motion follow Meridian (`~/.dotfiles/lib/theme/default.nix`, `home/common/programs/quickshell/DESIGN.md`).

## Direction contract

seed: none (direction pinned by the user: their Meridian system theme; day arc and clocks removed at the user's request)

THESIS: the site is set in the desktop it was built on. It refuses the generic dark portfolio: the pages read like the shell's own surfaces, with an instrument bar, plates, rows and gilt kept for "here" and "on".

OWN-WORLD: night-slate grounds stepped ground → plate → inset, with every edge a 1px rule. Enamel legends with a text → text2 → muted ramp. Gilt only for "here" (the current page, the current section) and "on" (active projects, "now"), plus one primary button per page. Atkinson Hyperlegible Next with tabular figures; Fira Code for code only, in Meridian syntax colours. Corners step 10/8/6/2. Screenshots are windows with a rule edge, and only the homepage's hero window floats (Float shadow).

STORY: a name and a role with the latest public push as evidence, then the work as windows, the full record as rows on a plate, the CV, and the way to reach him.

FIRST VIEWPORT: the instrument bar, with pages as workspace items (the current one gilt over a 2px rule) and Contact on the right. The name in Light at display scale, top-left, with the lead, the gilt "View GitHub" and a secondary "Get in touch" below it, and the latest-push line set on a rule beneath them. The Cider window floats on the right.

FORM: the Meridian Window register for page openers (Light display names and titles, one 650ms reveal on arrival), and the Instrument register for everything else (rows, plates, readouts; nothing moves that didn't change).

SIGNATURE: on write-ups, the contents rail uses the workspace index: the current section is gilt, with a 2px rule that glides to it. The homelab's kromgo readouts are set as shell readouts: ok for "up", and level tracks for CPU and memory, fetched at build time.
