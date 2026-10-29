# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences read the site the same way: as a durable professional record of Paul Thompson ("Core").

- People assessing him professionally: hiring managers, recruiters and colleagues who skim credentials and judge craft quickly.
- Engineers and open-source peers: Cider users and contributors, Nix and homelab people, who read the write-ups and follow the GitHub work.

There is no single conversion goal. Success is a visitor leaving with an accurate picture of who he is, what he has built, and how to reach him.

## Product Purpose

The personal site of Paul Thompson, a Graduate Software Engineer at Lockheed Martin, known online as Core. It presents his work (four years on the Cider Apple Music client, a NixOS/nix-darwin flake, a three-node Talos Kubernetes homelab, university and earlier projects), long-form write-ups and writing, his experience, education and certifications, and ways to contact him.

## Positioning

Evidence over claims. The site shows real artefacts: actual screenshots, the flake as written, the cluster's real stack, live kromgo badges from the homelab, and his latest public GitHub push fetched live. A generic developer portfolio cannot copy that, because it is his own work, shown as it is.

## Operating Context

- Routes: `/` (hero, selected work, all projects, about, contact), `/projects`, `/projects/[slug]` write-ups, `/blog`, `/blog/[slug]`, `404`.
- Content: projects and posts are Markdown collections in `src/content/`; the project list is data in `src/data/work.ts`.
- Live data: the hero's "last pushed" line is built at build time and refreshed client-side from the GitHub API, cached ten minutes per browser.
- Built with Astro 7 and Tailwind 4, deployed as static assets on Cloudflare Workers. Bun and Node come from a Nix dev shell.

## Capabilities and Constraints

- Copy: microcopy (labels, link text, captions, empty states) may be edited. Facts, numbers, bios and claims stay as written; no new claims.
- Language: British English (`en-GB`), plain first-person voice.
- The blog link appears in navigation only while published posts exist.
- Content licence: CC BY-NC-SA 4.0.

## Brand Commitments

- Name: Paul Thompson, known online as Core. Handle `@core_hdd` on X, `coredev-uk` on GitHub, email core@coredev.uk.
- Voice: factual, specific and understated. Statements name concrete tools, numbers and dates rather than adjectives.

## Evidence on Hand

- Screenshots in `public/work/`: Cider 1 playlist, Cider album view, Cider 2 plugins, settings and lyrics (from the Cider Collective's public repositories, credited in the footer), the homelab cluster, and the NixOS "atlas" desktop.
- Write-ups: `src/content/projects/cider.md`, `homelab.md`, `nixos-configuration.md`; post `src/content/blog/four-years-of-cider.md`.
- Stated facts: one of three Cider 2 core leads in a team of fourteen, 20,000+ users; BSc Software Engineering, University of Kent, First Class Honours; AWS Certified Cloud Practitioner (2026), Azure AI-900 (2021).
- No testimonials, client logos or metrics beyond those above. Do not fabricate any.

## Product Principles

1. Show the work itself before describing it.
2. Every claim is specific and checkable: a repo, a date, a number.
3. Serve the skimmer and the reader: the record must scan in seconds and reward a full read.
4. The site is itself a sample of his craft, so its build quality is part of the evidence.

## Accessibility & Inclusion

No product-specific standard was stated. The existing build already includes a skip link, visible focus, reduced-motion handling and descriptive alt text; keep those.
