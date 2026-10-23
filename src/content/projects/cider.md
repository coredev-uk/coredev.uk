---
title: "Cider"
description: "A cross-platform Apple Music client. I worked on it from its Apple-Music-Electron days to the Cider 2 rewrite, where I built the macOS and Linux client and ran releases."
date: "2021-05-24"
technologies: ["TypeScript", "Vue", "Electron", "Node.js", "Dexie.js", "Firebase", "GitHub Actions", "Azure Pipelines", "CircleCI"]
github: "https://github.com/ciderapp/Cider"
demo: "https://cider.sh"
featured: true
status: "departed"
image: "/work/cider-1-playlist.webp"
imageAlt: "Cider 1 playing an Apple Music playlist, with the track list, playback bar and sidebar library."
gallery:
  - src: "/work/cider-2-plugins.webp"
    alt: "Cider 2 on Windows: the sidebar library and the plugin store, with the Butterchurn visualiser installed."
    caption: "Cider 2, the plugin store"
  - src: "/work/cider-2-settings.webp"
    alt: "Cider 2.3's settings over the library: the Visual page with General, Sweetener, Animated Artwork, Lyrics and Fonts."
    caption: "Cider 2, the settings window"
  - src: "/work/cider-2-lyrics.webp"
    alt: "Cider 2.0.3 in full-screen lyrics mode, tinted blue by the album artwork."
    caption: "Cider 2, the lyrics view"
---

Cider is a desktop Apple Music client for Windows, macOS and Linux. I worked on it from 2021 to early 2025, across three generations of the project, and ended as one of three core maintainers of Cider 2 in a team of fourteen. Cider is on version 4 now and has changed a lot since I left, but from what I can see the fundamentals I worked on are still there. The longer story is in [Four years of Cider](/blog/four-years-of-cider); this page is the summary.

## Apple-Music-Electron, 2021

I wanted a proper Apple Music app on Windows, found Apple-Music-Electron, and started fixing things in it. It was my first open-source contribution, and at the time it was just me and its creator, cryptofyre. It grew into a lot of the app: an integrated settings page on `electron-store`, a reworked theme system, transparency and acrylic on Windows, macOS window frames, menu bar and Touch Bar support, Linux desktop files and protocol handling, a localisation system with fallback languages, and logging and Sentry error reporting.

## Cider 1, 2021–2022

Cider 1 was built closed-source while Apple-Music-Electron was wound down. It started under the working name "project2", the Cider Collective formed around it, and it was partly a test of whether a full Apple Music client could be built at all. I was less sure of myself here and stuck to the parts I knew:

- Rewrote the Electron main process in TypeScript, with staged start-up and a single place for settings.
- Added a plugin system for the main process and moved desktop integrations onto it: MPRIS for Linux, Discord Rich Presence, the Windows thumbnail toolbar, the menu bar and the tray.
- Looked after releases for Windows, macOS and Linux through the CircleCI pipeline.
- Moved my own computer to Linux, which drove the Linux support: the Flatpak manifest, the AUR packages and other package-manager builds, and fixes for Linux desktops.

## Cider 2, 2022–2025

Cider 2 was a rewrite on Vue 3, closed source this time so the app could fund its own API server, AWS-hosted releases and Cloudflare Workers. Windows started on Sabiiro, a Tauri client in Rust, before moving to .NET. We wanted Tauri on Linux too, but DRM support in webkit2gtk ruled it out, so macOS and Linux stayed on Electron, at first reusing Cider 1's backend. With Linux at home and a Mac to hand I could cover every platform, and while the others focused on the frontend or the Windows client, the Electron side was mine. The team was spread across North America, Europe and Asia, so most of the work happened asynchronously in Discord. Larger features were developed on branches and merged through pull requests, with small fixes going straight to main.

- **Genten and its module system.** In August 2024 I rewrote the Electron client for macOS and Linux from scratch with Electron Forge and Vite. The old client started each integration with a manual call; in the new one every feature is a drop-in module that receives one typed environment: the window, client options, config, typed hooks fed by MusicKit events, and RPC helpers back into the player. It covers MPRIS and the XDG portal accent colour on Linux, native window controls and vibrancy on macOS, deep links, and signing for Castlabs' Widevine Electron build. It was one of my last big pieces of work on Cider, and the one I'm proudest of.
- **Izanami 2**, the shared Node core that Genten and the Windows client both run: the local HTTP and WebSocket API, config, themes, plugins, Discord and Last.fm. I gave it the same module shape as Genten, so anything that isn't platform-specific is written once there, and Genten boots it and reads its config over a token-protected local API. Going by its logs, Cider 4 still runs on this backend system.
- **MusicKit type definitions.** Apple's documentation was poor, so I wrote types for MusicKit and its API, worked out largely from how the Apple Music website made its calls. They made the codebase far easier for the team and for new contributors, and now live on as [musickit-types](https://github.com/coredev-uk/musickit-types).
- **v3Turbo**, a fetch helper that asks for a collection's total, then requests every page at once instead of one offset after another, with a fallback to the old approach. It sped up every large library and playlist load.
- **A local library database** on Dexie.js and IndexedDB, which kept playlists in step with Apple Music by comparing version hashes. Searching and sorting the library became instant instead of waiting on Apple's API. Holding the whole library locally was hard on lower-end machines, though, and a better caching layer replaced it at the end of 2023.
- **Connect 2**, a rewrite of a messy first Firebase account layer into typed classes for auth, Firestore and the Realtime Database, with settings sync and a remote-control relay. It fixed a lot, but Connect was sunset soon after: it was underused and accounts were moving to Kinde, so the code stayed in the app, waiting to be wired up to Kinde.
- **CI and releases.** I ran the pipeline: Azure Pipelines first, then GitHub Actions on self-hosted Linux, macOS and Windows runners. Builds only ran when the clients changed, commit tags and release-please drove publishing to the experimental and stable channels, Itch.io and GitHub, bash scripts normalised artefact names, and scheduled jobs kept the signing account and runners healthy.
- **Linux packaging**: Deb, RPM, AppImage and Flatpak builds, an Arch PKGBUILD, and the `cider`, `cider-git` and `cider-bin` AUR packages.
- **Bug reports and users**, across all three projects: I handled a large share of the issues and user communication, more than 300 issues in all, set up the GitHub triage process the project still uses, and built the in-app bug report and troubleshooting tools. The community in our Discord was good, and its direct feedback helped a lot.

## What it taught me

Most of what I know about Electron, packaging for Linux and macOS, release automation and supporting real users, I learned on Cider. Setting up the infrastructure to ship on every platform took ages, but it made every release after it easy. Working against an API Apple never published for us also taught me to expect the data underneath to change at any time.
