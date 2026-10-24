export const GITHUB_USER = "coredev-uk";
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`;
export const EMAIL = "core@coredev.uk";
export const LINKEDIN_URL = "https://www.linkedin.com/in/-paulthompson/";
export const X_URL = "https://x.com/core_hdd";

export interface WorkRow {
  name: string;
  what: string;
  stack: string;
  years: string;
  /** Project write-up on this site, if one exists. */
  slug?: string;
  /** Public source; omitted for private or offline work. */
  href?: string;
}

export interface WorkGroup {
  title: string;
  rows: WorkRow[];
}

export const workGroups: WorkGroup[] = [
  {
    title: "Cider and Apple Music",
    rows: [
      { name: "Cider 2", what: "Apple Music client, core lead", stack: "Vue 3, Electron, .NET", years: "2022–2025", slug: "cider", href: "https://github.com/ciderapp/Cider-2" },
      { name: "Cider", what: "Main process, plugins, releases", stack: "Vue 2, Electron", years: "2021–2022", slug: "cider", href: "https://github.com/ciderapp/Cider" },
      { name: "Apple-Music-Electron", what: "Settings, themes, platform support", stack: "JavaScript, Electron", years: "2021", href: "https://github.com/ciderapp/Apple-Music-Electron" },
      { name: "AUR packages", what: "cider, cider-git, cider-bin", stack: "PKGBUILD, Bash", years: "2021–2025", href: "https://github.com/ciderapp/aur-packages" },
      { name: "musickit-types", what: "Types for MusicKit.js", stack: "TypeScript", years: "2025–now", href: `${GITHUB_URL}/musickit-types` },
    ],
  },
  {
    title: "Infrastructure",
    rows: [
      { name: "nixos", what: "NixOS and macOS flake", stack: "Nix, nix-darwin", years: "2024–now", slug: "nixos-configuration", href: `${GITHUB_URL}/nixos` },
      { name: "macos-wallpapers", what: "macOS wallpapers that follow the sun", stack: "Python, Nix", years: "2024–now", href: `${GITHUB_URL}/macos-wallpapers` },
      { name: "homelab", what: "Three-node Talos cluster", stack: "Kubernetes, Flux", years: "2025–now", slug: "homelab" },
      { name: "dotfiles", what: "Arch with i3 and Hyprland", stack: "Lua, Shell", years: "2022–2025", href: `${GITHUB_URL}/dotfiles` },
      { name: "coredev.uk", what: "This site", stack: "Astro, Cloudflare", years: "2023–now", href: `${GITHUB_URL}/coredev.uk` },
    ],
  },
  {
    title: "University of Kent",
    rows: [
      { name: "Drum Smith", what: "Drum synth plugin, team of four", stack: "C++, JUCE, CMake", years: "2024–2025" },
      { name: "CompuRiddle", what: "Riddles written and scored by AI", stack: "TypeScript, TensorFlow.js", years: "2025", href: `${GITHUB_URL}/comp6590-practical-project` },
      { name: "Hash miner", what: "Bitcoin-style proof-of-work mining", stack: "TypeScript, Bun", years: "2025", href: `${GITHUB_URL}/comp6575-hash-miner` },
      { name: "Motion light", what: "ESP32 sensor and smart plug", stack: "C++, ESP32, MQTT", years: "2024" },
      { name: "Surgery bookings", what: "Desktop app, team of five", stack: "Java, Swing, PostgreSQL", years: "2024" },
      { name: "Google Hash Code", what: "Self-driving rides problem", stack: "Java, JUnit", years: "2024" },
    ],
  },
  {
    title: "Earlier",
    rows: [
      { name: "CoreCheck", what: "Boeing 737 checklists", stack: "HTML", years: "2022", href: `${GITHUB_URL}/CoreCheck` },
      { name: "Advent of Code", what: "Daily puzzles", stack: "TypeScript", years: "2022–2023", href: `${GITHUB_URL}/aoc` },
      { name: "cmb", what: "Garry’s Mod military boards", stack: "Lua", years: "2022–2024", href: `${GITHUB_URL}/cmb` },
      { name: "Garry’s Mod servers", what: "Seven servers, three clients", stack: "Lua", years: "2016–2020" },
    ],
  },
];

export interface LatestPush {
  repo: string;
  repoUrl: string;
  message: string;
  commitUrl: string;
  at: string;
}

/**
 * The most recent public push and its head commit message.
 * Runs at build time for the static fallback; the hero script refreshes it in the browser.
 */
export async function getLatestPush(): Promise<LatestPush | null> {
  try {
    const events = await fetch(`https://api.github.com/users/${GITHUB_USER}/events/public?per_page=30`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!events.ok) return null;
    const list = (await events.json()) as Array<{ type: string; created_at: string; repo: { name: string }; payload: { head?: string } }>;
    const push = list.find((e) => e.type === "PushEvent" && e.payload.head);
    if (!push) return null;
    const commit = await fetch(`https://api.github.com/repos/${push.repo.name}/commits/${push.payload.head}`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!commit.ok) return null;
    const data = (await commit.json()) as { html_url: string; commit: { message: string } };
    return {
      repo: push.repo.name.split("/")[1],
      repoUrl: `https://github.com/${push.repo.name}`,
      message: data.commit.message.split("\n")[0],
      commitUrl: data.html_url,
      at: push.created_at,
    };
  } catch {
    return null;
  }
}
