# coredev.uk

The personal site of Paul Thompson, known online as Core: projects, write-ups and writing.

Built with [Astro](https://astro.build) and deployed to Cloudflare Workers.

## Development

Bun and Node come from the Nix dev shell in `flake.nix`. With direnv and nix-direnv, entering the folder loads it; otherwise run `nix develop` first.

```sh
bun install
bun run dev      # local dev server
bun run build    # static build into dist/
bun run preview  # build, then serve it with Wrangler as Cloudflare would
bun run deploy   # build and deploy with Wrangler
```

## Content

- Project write-ups live in `src/content/projects/`, blog posts in `src/content/blog/`.
- The projects list on the home and projects pages comes from `src/data/work.ts`.
- Screenshots used on the site are in `public/work/`.

## License

The content of this project is licensed under the Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0) License. See the `LICENSE` file for details.

## Contact

For any enquiries, please reach out to [core@coredev.uk](mailto:core@coredev.uk).
