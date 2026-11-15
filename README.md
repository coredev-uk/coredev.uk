<img src="public/favicon.svg" alt="" width="100" align="left">

### coredev.uk

[![Website](https://img.shields.io/website?url=https%3A%2F%2Fcoredev.uk)](https://coredev.uk)
[![Astro](https://img.shields.io/badge/astro-7-BC52EE?logo=astro&logoColor=white)](https://astro.build)
[![Cloudflare Workers](https://img.shields.io/badge/cloudflare-workers-F38020?logo=cloudflare&logoColor=white)](https://workers.cloudflare.com)

The personal site of Paul Thompson, known online as Core: projects, write-ups and writing.

[Website](https://coredev.uk) •
[Development](#development) •
[Content](#content) •
[Issues](https://github.com/coredev-uk/coredev.uk/issues)

<br clear="left">

<img src="public/og.jpg" alt="The coredev.uk social card: Paul Thompson, Graduate Software Engineer, known online as Core. Cider, NixOS and a Kubernetes homelab. Beside it, a terminal with a Nix flake open in an editor and a git log.">

## Development

<details>
<summary>Run the site locally and deploy it</summary>

Bun and Node come from the Nix dev shell in `flake.nix`. With direnv and nix-direnv, entering the folder loads it; otherwise run `nix develop` first.

```sh
bun install
bun run dev      # local dev server
bun run build    # static build into dist/
bun run preview  # build, then serve it with Wrangler as Cloudflare would
bun run deploy   # build and deploy with Wrangler
```

</details>

## Content

<details>
<summary>Where the pages and pictures live</summary>

- Project write-ups live in `src/content/projects/`, blog posts in `src/content/blog/`.
- The projects list on the home and projects pages comes from `src/data/work.ts`.
- Screenshots used on the site are in `public/work/`.

</details>

## Contributing

Report problems with the site in [Issues](https://github.com/coredev-uk/coredev.uk/issues).
For anything else, email [core@coredev.uk](mailto:core@coredev.uk).

## Licence

The content of this site is licensed under the Creative Commons Attribution-ShareAlike 4.0
International licence ([LICENSE](LICENSE)).
