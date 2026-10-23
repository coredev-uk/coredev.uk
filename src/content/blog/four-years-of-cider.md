---
title: "Four years of Cider"
description: "A look back at my time on Cider, from my first open-source contribution to the Electron client, module system and release pipeline behind Cider 2, and what I took away from it."
publishDate: "2026-10-23"
tags: ["cider", "electron", "typescript", "vue", "ci-cd", "linux", "open-source"]
featured: true
draft: false
image: "/work/cider-2-lyrics.webp"
imageAlt: "Cider 2.0.3 in full-screen lyrics mode, tinted blue by the album artwork."
---

From 2021 to early 2025, most of my spare time went into one project. It started as Apple-Music-Electron, became Cider, and then Cider 2, a closed-source rewrite. By the end I was one of three core maintainers on a 14-person international team, and the app had more than 20,000 users. Cider is on version 4 now and has changed a lot since I left, but I wanted to write down what my time on it looked like: how I got into it, the parts I built, and what I took away.

## How I got involved

In 2021 I wanted a proper Apple Music app on Windows, and there wasn't one. Apple-Music-Electron, a small open-source project started by cryptofyre, was the closest thing, so I started using it and then started fixing things in it. It was my first open-source contribution, and when I joined it was just the two of us.

What began as small fixes grew into a lot of the app. I built an integrated settings page to replace the old preferences window, with visual, audio and window settings, and moved the configuration onto `electron-store` with checks that could update an outdated config and relaunch the app. I reworked the theme system so themes lived in the user's app data, could be refreshed from the themes repository from inside the app, and had a development mode so theme authors weren't overwritten on every launch. I added the transparency and acrylic options on Windows, macOS window frames, the menu bar and Touch Bar support, and on Linux the desktop files and protocol handling for the AppImage, Deb, Snap and RPM builds, along with MPRIS fixes. Alongside that came Discord Rich Presence and Last.fm fixes, a localisation system with fallback languages, better logging and Sentry error reporting.

## Cider 1

![Cider 1 playing an Apple Music playlist, with the track list, playback bar and sidebar library](/work/cider-1-playlist.webp)

While Apple-Music-Electron was being wound down, its successor was being built behind closed doors under the working name "project2". It became Cider at the end of 2021, with the Cider Collective forming around it. In a way it was a demo: we wanted to see whether a full Apple Music client, with its own interface rather than a wrapped web page, could be built at all.

I was less sure of myself on Cider 1 and stuck mostly to the parts I knew. I rewrote the Electron main process in TypeScript, with start-up split into clear stages and a single place for settings, and added a plugin system so desktop integrations like MPRIS, Discord Rich Presence, the Windows thumbnail toolbar, the menu bar and the tray had a common shape instead of being wired into one file.

The rest of my time went on releases. I looked after the Windows, macOS and Linux builds and the CircleCI pipeline that produced them. Around then I also switched my own computer at home to Linux, and that pushed a lot of the Linux work: the Flatpak manifest, the AUR packages and the other package-manager builds, and fixing whatever broke on Linux desktops. Without that I don't think Cider would have shipped on Linux, or not as well adapted to it.

## Starting again with Cider 2

![Cider 2.3's settings window over the library](/work/cider-2-settings.webp)

Cider 1 showed it could be done; Cider 2 was the chance to do it properly. It was a full rewrite on Vue 3 and Quasar, and this time it was closed source. That was about money: by then we were running an API server, serving release builds through AWS and using Cloudflare Workers for various services, and the bills were growing, so the app needed to pay for its own development.

The plan was one shared frontend with a native backend for each platform. Windows went through several backends before it settled on .NET, and snapshots of three of them are public: [Sabiiro](https://github.com/ciderapp/Sabiiro-Snapshot), a Tauri client written in Rust; [Fujisan](https://github.com/ciderapp/Fujisan-Snapshot), built on Wails; and [Nexus](https://github.com/ciderapp/Nexus-Snapshot), a C# and WPF client whose parts were reworked into the .NET backend. We pushed hard for Tauri on Linux, since a system webview would have been far lighter than shipping Chromium, but DRM stopped us: Apple Music's protected playback needs Widevine, and webkit2gtk couldn't provide it. We even spoke to the Tauri team about a workaround, but the limitation sat in webkit2gtk itself. So macOS and Linux stayed on Electron, and to begin with simply reused Cider 1's Electron backend.

That Electron side became mine. I was on Linux at home and had a Mac at the time, so I could test every platform myself. Other developers had Macs too, but they mostly stuck to the frontend or the Windows client and left the Electron backend to me, so I led it and worked with the Windows side on the parts both clients shared. This is where I did my most important work on the project.

## A team across time zones

For a long time I was the only Brit on the team. The other leads were in the US, and most of the developers were American, with others across Europe, West Asia and East Asia.

Almost everything happened in Discord. My afternoons and evenings overlapped with the American working day, so that was when we could work things through together, and bigger pieces of work often had someone alongside me testing and improving them as I went. The rest of the time, when I made a change I posted it in the chat and the replies came in when the others woke up. Working that way was a struggle at times, and it taught me to write changes and messages that made sense to someone reading them hours later with no one around to ask.

## Working against Apple's API

Apple doesn't offer an API for building a desktop Apple Music client. Cider was built on MusicKit JS, Apple's web player library, and on a lot of reverse engineering of the Apple Music endpoints behind it.

That made Apple a moving target. Changes arrived without warning: sometimes the token we relied on stopped working, and sometimes an endpoint's response changed shape and broke every page that read it. One of the biggest was a CORS change on Apple's side that broke the way we fetched the token, and we had to rework how the app got it. A lot of the work across those years never shows up as a feature. It was working out what Apple had changed overnight, fixing it, and getting a release out before most users noticed. It was an uphill battle, and it taught me to write code that expects the data it depends on to change.

Apple's documentation was poor, so the most useful reference we had was the Apple Music website itself: watching which calls it made and which parameters it sent. Out of that I wrote type definitions for MusicKit, which became one of the things I'm proudest of. They made development much easier for the whole team and made Cider far more approachable for new developers who would otherwise have been guessing at Apple's data. They later became their own repository, [musickit-types](https://github.com/coredev-uk/musickit-types).

## A local library database

One of the first big problems I took on in Cider 2 was the library. Apple Music's API returns large collections in pages: you ask for a hundred items, then the next hundred with an offset, and so on. A large library meant a long chain of requests, one after another, every time you opened the songs, albums or artists page.

The first fix was a call I named `v3Turbo`. Instead of walking the pages in turn, it asks the API for the total first, works out every page it will need, and requests them all at once, then puts the results back in order. If the total isn't available it falls back to the old one-by-one approach. Trimmed, the core of it looks like this:

```ts
const callList = [];
const order: { [index: string]: MusicKit.MediaItem | [] } = {};
for (let i = 0; i < args.total; i += 100) {
  order[`${href}?offset=${i}`] = [];
  callList.push(`${href}?offset=${i}`);
}
const requests = callList.map((url) =>
  MusicKit.getInstance().api.v3.music(url, { limit: 100, ...args.queryParams })
    .then((response: any) => { order[url] = response?.data?.data; }),
);
await Promise.all(requests);
return Object.values(order).flat();
```

It sped up every large fetch in the app. It wasn't multithreaded, though: everything still ran on one thread and held every page in memory at once, so on the biggest calls it added to the memory trouble I'll come to below. In hindsight I would have made it multithreaded. The second step was a client-side database using Dexie.js on top of IndexedDB, so the library didn't need fetching at all once it was stored. This is the schema it ended up with (trimmed):

```ts
class MediaDatabase extends Dexie {
  public constructor(dbName: string = 'AM-LibraryDB') {
    super(dbName);
    this.dbName = dbName;
    this.version(3).stores({
      songs: 'id',
      artists: 'id, attributes.name',
      albums: 'id, attributes.artistName',
      playlists: 'id, versionHash, *tracks', // Relational table for playlists tracks
      library: 'trackId', // Relational table for library tracks
    });
  }
}
```

Playlists were the hard part, and a nightmare in general. Apple has catalog playlists and library playlists, and neither is guaranteed to contain everything. You also don't want to download every track of every playlist on every launch. Apple's catalog API exposes a `versionHash` for playlists, so the database stored that hash and only re-fetched a playlist's tracks when it changed. Private library playlists don't have a catalog entry, so the code had to ask the API for one before it could read the hash. A background refresh kept everything up to date, and there was a button to rebuild the database from scratch if anything went wrong.

For a while it was great. With the whole library on the user's machine, searching and sorting became instant instead of a wait on Apple's API. Then we rolled it out more widely and the bug reports started coming in. Holding a large library in the browser's storage and memory caused real trouble on lower-end machines, which I had never considered: I was experimenting, focused on getting it working on my own computer, and didn't have the experience to see it coming. With that, and a better caching layer arriving for the library pages, I removed the database at the end of 2023.

## Connect 2 and Firebase

Cider Connect was the account layer: settings sync, a remote-control relay, Listen Together and Spotify playlist import, all running on Firebase. The first version was, honestly, a mess. At the end of 2023 I rewrote it as a set of typed classes for Firebase auth, Firestore and the Realtime Database, with each feature in its own file and the secrets moved out of the code. It fixed a lot of the problems.

Settings sync was the part that needed the most care. The client flattened its config into keys and stored it against the user's account. On start-up it compared the remote copy with the local one and, if they differed, asked the user which to keep instead of silently overwriting either. A few keys were never synced, like the sync toggle itself and the config migration level:

```ts
const excludedKeys = ['connect.toggles.sync', 'migration_level'];
```

I added more commands to the remote relay over the following months, but not long after the rewrite Connect was sunset. It was underused, and the project was moving accounts to Kinde instead. The code stayed in the app but stopped working, waiting to be wired up to Kinde, which hadn't happened by the time I left.

## The Electron side: macOS and Linux

Until mid-2024 the Electron backend lived inside the main app. I added a module loader there so features could be loaded as modules, MPRIS so Linux desktops could see and control what was playing, a rewrite of Discord Rich Presence that also worked inside Flatpak and Snap, proper logging, and a move away from an old IPC bridge to a more trusted model. When the team worked on a Steam Deck build, other developers did the interface and I did the backend optimisations. The Steam release never happened: Valve turned the app down as "too specific".

## Genten and Izanami

![Cider 2's plugin store, with the Butterchurn visualiser installed](/work/cider-2-plugins.webp)

This was one of the last big pieces of work I did on Cider, and the one I'm proudest of.

In 2024 the project moved into a monorepo with separate packages for the frontend, the Windows client and the Electron client, which we called Genten. I rebuilt Genten from scratch with Electron Forge and Vite.

The old client was written as plain functions. Start-up was a list of manual calls into each integration, and every new feature meant editing that list and wiring itself into whatever it needed. The new Genten is built around a small module system. Every feature is a file that calls `defineModule` with a name and a function, so adding one is a matter of dropping in a file. The loader hands that function one typed environment, a shared set of functions every module uses: the window, the app, the user's client options, the shared config, typed hooks, and helpers that drive the player and router in the frontend. A module never reaches into the rest of the client. I also designed it so backend plugins could hook into the same system, though I don't know whether that was taken further after I left. Here is the MPRIS module, trimmed:

```ts
export default defineModule('mpris', ({ hook, rpc, app, window, options }) => {
  if (!options.linux.useMpris) return;

  const player = new Player({ name: app.getName().toLowerCase(), supportedInterfaces: ['player'] });

  player.on('next', () => rpc.playback.next());
  player.on('playpause', () => rpc.playback.playPause());
  player.on('raise', () => window.show());

  hook.create('musickit:volumeChanged', ({ volume }) => {
    player.volume = volume;
  });
});
```

Events flow both ways. The frontend reports what MusicKit is doing (the current track, playback state, position, volume, repeat and shuffle), Genten turns those into typed hooks, and any module can listen for the ones it cares about. Commands go back the other way through the player helpers. Modules load in order, with the platform-specific ones only loaded where they make sense:

```ts
if (platform === 'linux') {
  await import('./modules/plugins/mpris');
  await import('./modules/plugins/xdg');
}
```

The part I like most is how this fits with Izanami, the shared Node library that both Genten and the Windows client run. It holds everything that isn't specific to one platform: the local HTTP and WebSocket API, config, playback and lyrics endpoints, themes, plugins, Discord and Last.fm. When I rebuilt it as Izanami 2, I gave it the same shape as Genten: each feature is a module with a `setup` function that receives the server, security checks, config access and the events it needs. I later rewrote its WebSocket API, moved it to newer Fastify plugins and added token authentication for WebSocket clients.

Genten starts Izanami from one of its own modules. Izanami then serves the frontend and the config over a local API protected by a token created at launch, and Genten falls back to a config file if it can't be reached. So the Electron client only contains what really belongs to Electron and the operating system: the window, the tray and menu bar, MPRIS and the desktop accent colour on Linux, native window controls and vibrancy on macOS. Anything shared is written once in Izanami and works on Windows too.

Getting Genten signed was its own project. It runs on Castlabs' Widevine-enabled Electron build, which needs a signing step of its own on top of Apple's code signing and notarisation, and that took more of my time than I'd like to admit.

## CI, releases and packaging

I looked after Cider 2's build and release pipeline for most of my time on the project. It started on Azure Pipelines, where I moved the builds onto our own Linux and macOS machines, and moved to GitHub Actions in 2023. By the time I left it looked like this:

- **Builds** ran on our own self-hosted runners for Linux, macOS and Windows, and only when the clients had changed. A `[save-artifacts]` tag in a commit kept the build for testers.
- **Publishing** was driven by commit tags and release-please: `[publish]` for the experimental channel, `[publish:stable]` for the stable channel, Itch.io and GitHub, with release-please writing the changelogs.
- **Release jobs** collected every platform's builds, gave them consistent file names, uploaded them to GitHub and Itch.io and posted the result to Discord.
- **Housekeeping** ran on a schedule to keep the signing account and the runners healthy.
- **Pull requests** were built and linted automatically.

On Linux, Genten builds Deb, RPM, AppImage and Flatpak packages, and I maintained the `cider`, `cider-git` and `cider-bin` AUR packages. Flatpak took the most attempts of anything, mostly getting MPRIS and Discord to work from inside the sandbox.

## Translations and types

I moved Cider 2's translations onto Crowdin's CDN, so the app fetched them at runtime and fell back to English, and a translation update no longer needed a new release. Alongside the MusicKit types, I wrote the shared types package that the frontend, Genten and Izanami all used, and converted older parts of the frontend to TypeScript.

## Bug reports and users

Across all three projects I handled a large share of the bug reports and much of the communication with users, and I set up the GitHub triage process the project still uses today. Over those years I handled more than 300 issues. Some of that ended up in the app as a bug report button, more useful bug reports and a troubleshooting section with a log viewer. A lot of it never touched code: writing quick-fix guides and FAQs, answering questions, and getting on a call to watch someone's screen when a log didn't explain the problem.

The community itself was good to us. Having users in our Discord meant we got feedback from them directly, and that helped a lot with what we fixed and built. If anything, they were almost too good at it: nothing ever broke quietly.

## Alongside my degree

Most of Cider happened alongside my studies. It was a passion project and I really enjoyed it, and there were probably times I focused on it more than on my degree. The two fed each other, though. University taught me object-oriented programming, and that spilled straight into Cider: it's why the library database and the Firebase rewrite were both built around classes.

## What I learned

- **Shipping takes infrastructure.** Writing the code is still the biggest job, but setting up everything needed to sign, package and release it on every platform easily takes ages, and it's what makes every release after that easy.
- **Step back before you dig in.** The library database made search instant, but I was set on getting it done and didn't think enough about people on lower-end hardware.
- **Give modules one way in.** Genten's modules only ever see the environment the loader hands them. That made each one easy to read on its own, and made it obvious what belonged in Electron and what belonged in Izanami.
- **Make CI easy to use.** With tags in commit messages, anyone on the team could save or publish a build without touching a workflow file.
- **Linux users find everything.** Tiling window managers, Flatpak sandboxes and missing desktop portals all turned up bugs on the Linux side.
- **Support makes you a better developer.** Fixing a problem someone has just described to you teaches you more than most code reviews.
- **Expect the API to change under you.** When you build on endpoints you don't control, the code that checks what came back matters as much as the code that uses it.

## Leaving

I left the Cider Collective in February 2025, a few months before I finished my degree. By then I disagreed with a number of decisions about how the project was being run, and it was the right time to step away and put my time into my degree and my own projects.

Since then Cider has been through versions 3 and 4, with a new audio engine, a rebuilt queue and plenty more, all in the [public changelogs](https://cider.sh/changelogs). Going by the logs the app writes today, it still runs on the same Genten and Izanami backend, and I'd expect a lot has been built on top of it. I'm proud of what I built, and grateful to the people I built it with. It's rare to get to work on something so many people use while you're still a student.
