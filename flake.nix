{
  description = "coredev.uk development shell";

  inputs.nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";

  outputs =
    { nixpkgs, ... }:
    let
      systems = [
        "x86_64-linux"
        "aarch64-linux"
        "x86_64-darwin"
        "aarch64-darwin"
      ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f nixpkgs.legacyPackages.${system});
    in
    {
      devShells = forAllSystems (pkgs: {
        # Astro's CLI runs on Node; Bun installs packages and runs the scripts.
        # Keep the Node major in step with .node-version, which Cloudflare's builds read.
        default = pkgs.mkShellNoCC {
          packages = [
            pkgs.bun
            pkgs.nodejs_26
          ];
        };
      });
    };
}
