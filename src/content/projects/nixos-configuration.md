---
title: "NixOS Configuration"
description: "One Nix flake for a NixOS desktop and a MacBook: Disko installs, Lanzaboote Secure Boot, nix-darwin and Home Manager"
date: "2024-02-05"
technologies: ["Nix", "NixOS", "nix-darwin", "Home Manager", "Disko", "Lanzaboote", "Hyprland", "GitHub Actions"]
github: "https://github.com/coredev-uk/nixos"
status: "active"
featured: true
image: "/work/nixos-atlas.webp"
imageAlt: "The atlas desktop on Hyprland: flake.nix open in Neovim, fastfetch showing NixOS 26.05, and the flake's recent git history."
---

Everything about my computers lives in one Nix flake: the operating system, the desktop, my editor, my shell and the apps I use. I moved to it from Arch Linux, where I had used i3 and then Hyprland, and the flake is now how I set up and maintain every machine I use day to day. Getting started leaned heavily on [jnsgruk's NixOS config](https://github.com/jnsgruk/nixos-config), and the structure still shows it.

## The machines

| Host | System | Device |
| --- | --- | --- |
| `atlas` | NixOS with Hyprland | Desktop |
| `poseidon` | macOS with nix-darwin | Laptop |

Each host is a small file of its own. Shared helpers in `lib` build a NixOS, nix-darwin or Home Manager configuration from a hostname and a few options, so adding a machine is mostly a matter of describing it.

## Installing from nothing

A new `atlas` install is one command from the installer's dev shell: `./install-with-disk atlas`. Disko partitions the drive by its stable ID and creates an unencrypted boot partition, a LUKS-encrypted container and btrfs subvolumes inside it. The script then installs the system and copies the flake into my home directory, so the machine manages itself from the same repository afterwards.

Secure Boot is handled by Lanzaboote. The installer creates the signing keys before the system is installed, so boot files are signed from the first boot, and enrolling them in the firmware is left as a deliberate manual step that keeps Microsoft's keys for dual-booting Windows.

## The desktop

`atlas` runs Hyprland, with Quickshell for the bar and widgets, SwayNC for notifications and Vicinae as the launcher. Ghostty, Zellij and zsh make up the terminal, and Neovim is configured in Nix through nixvim. Catppuccin Mocha with a blue accent is set once in the flake's theme and applied everywhere, from GTK apps to the terminal.

The desktop also covers the less glamorous parts: NVIDIA drivers, 1Password, YubiKey support, QMK keyboards, RGB and monitor brightness over DDC/CI. For Windows-only software there is a single-GPU passthrough setup that hands the graphics card to a Windows virtual machine from a desktop launcher, with the option to reboot straight into Windows instead.

## The MacBook

`poseidon` runs macOS with nix-darwin and nix-homebrew, so system settings, command-line tools and even Homebrew apps come from the same flake. My shell, Git and editor configuration are shared with `atlas` through Home Manager, so both machines feel the same to work on.

## Keeping it honest

Two GitHub Actions workflows check the flake. On every push, one evaluates every NixOS, nix-darwin and Home Manager configuration without building them, and checks formatting with treefmt, which catches broken options and typos early. The other does full builds of both machines when the pinned inputs change, every Monday and on demand, because some failures only show up when a package actually builds.

## Why I use it

It makes my setup reproducible and reversible. A new machine is an install command away, a bad change is a rollback away, and the whole history of how my computers are configured is in Git.
