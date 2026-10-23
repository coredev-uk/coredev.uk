---
title: "Homelab"
description: "A three-node Talos Linux Kubernetes cluster run by Flux from Git, with Rook Ceph storage, CloudNativePG, External Secrets and Prometheus, Grafana and VictoriaLogs"
date: "2025-09-01"
technologies: ["Kubernetes", "Talos Linux", "Flux", "Helm", "Cilium", "Rook Ceph", "CloudNativePG", "External Secrets", "Prometheus", "Grafana", "VictoriaLogs", "Kritika", "AI agents"]
status: "active"
image: "/work/homelab-cluster.webp"
imageAlt: "Three terminals on the atlas desktop: Flux listing the cluster's platform HelmReleases, kubectl showing the three Talos nodes and their load, and a passing talosctl health check."
badges:
  - src: "https://kromgo.hera.ac/badges/buddy_ping"
    alt: "Home internet status"
  - src: "https://kromgo.hera.ac/badges/buddy_status_page"
    alt: "Status page"
  - src: "https://kromgo.hera.ac/badges/buddy_heartbeat"
    alt: "Alertmanager heartbeat"
  - src: "https://kromgo.hera.ac/badges/cluster_birth_age"
    alt: "Cluster age"
  - src: "https://kromgo.hera.ac/badges/cluster_uptime_age"
    alt: "Cluster uptime"
  - src: "https://kromgo.hera.ac/badges/cluster_node_count"
    alt: "Node count"
  - src: "https://kromgo.hera.ac/badges/cluster_pod_count"
    alt: "Pod count"
  - src: "https://kromgo.hera.ac/badges/cluster_cpu_usage"
    alt: "Cluster CPU usage"
  - src: "https://kromgo.hera.ac/badges/cluster_memory_usage"
    alt: "Cluster memory usage"
  - src: "https://kromgo.hera.ac/badges/cluster_alert_count"
    alt: "Firing alerts"
---

My homelab is a small Kubernetes cluster that runs the services I use at home. Everything about it lives in one Git repository: the operating system configuration for each machine, the cluster's platform components and every application. Flux watches that repository and makes the cluster match it, so a change is a commit and a rollback is a revert.

The repository is private because it describes my home network, but the setup follows the patterns of the public home-ops community, and in particular [onedr0p/home-ops](https://github.com/onedr0p/home-ops).

## Hardware

Three small machines run as Kubernetes control-plane nodes, with a NAS alongside them:

- **hyperion-0**: Beelink SEi14, Intel Core Ultra 5 125H, 32 GB of DDR5 and a Google Coral TPU
- **hyperion-1**: Lenovo ThinkCentre M720q, Intel Core i5-8400T, 16 GB
- **hyperion-2**: Lenovo ThinkCentre M920q, Intel Core i5-8500T, 16 GB
- **UniFi UNAS 2** with two 2 TB IronWolf drives for bulk storage

Each node has a small drive for Talos and a 1 TB drive given to Ceph.

## Talos Linux

The nodes run [Talos Linux](https://www.talos.dev/), an operating system built only to run Kubernetes. There is no shell and no SSH; the machines are configured through an API from templated configuration files in the repository, and upgrades replace the whole system image at once. Upgrading a node or Kubernetes itself is a single `just` command, and the cluster can be rebuilt from nothing with `just bootstrap`.

## GitOps with Flux

Flux reconciles about 65 Kustomizations and 69 Helm releases from the repository. Renovate opens pull requests when charts and images have new versions, and CI checks each change before it merges: it diffs the rendered manifests, pre-pulls Talos images on a self-hosted runner and audits the GitHub Actions workflows with zizmor.

## The platform

- **Networking**: Cilium as the network layer, Envoy Gateway for routing, Cloudflare Tunnel and Cloudflare DNS for anything reachable from outside, and Pi-hole for DNS at home.
- **Certificates**: cert-manager issues and renews TLS certificates automatically.
- **Storage**: Rook Ceph replicates block storage across the three nodes. Databases run as their own CloudNativePG clusters, one per application, and Kopiur handles backups.
- **Secrets**: nothing sensitive is stored in Git. External Secrets pulls each secret from 1Password Connect at deploy time.
- **Observability**: kube-prometheus-stack collects metrics, Grafana dashboards are managed by the Grafana operator, VictoriaLogs stores logs, and Gatus and blackbox exporters check that services answer. Small Kromgo badges publish cluster age, uptime and load.
- **Upgrades**: tuppr upgrades Talos and Kubernetes in place, one node at a time.

## What runs on it

It runs the services I use at home, including Home Assistant for the house, Mealie for recipes, Outline for notes, Atuin for shell history sync across my machines, and Pocket ID as a single sign-on provider for the apps that support it.

## Working with AI

This is the project where I lean on AI the most, and where I've put the most thought into making it useful rather than just fast.

- **Coding agents.** A lot of the recent work on the cluster was done with AI coding agents working directly in the repository: moving every app's database from Bitnami charts to its own CloudNativePG cluster with backups, fixing deployments that broke after a wave of updates, and building the Home Assistant dashboards. The agent proposes the change; I review it, and Flux only rolls out what I merge.
- **Skills.** The repository carries its own agent skill, `reviewing-pull-requests`, which teaches an agent how changes are judged here. For a Renovate update it covers finding the upstream project, reading every release between the old and new versions, and spotting breaking changes, defaults that moved, and images a chart changes without them appearing in the diff. For a change under `kubernetes/` it covers rendering and diffing HelmReleases with flate, reading images and OCI charts with crane, searching for anything else that depends on the change, and checking what Renovate's own rules say. The skill lives in `.agents/skills` and is linked into Claude Code's skills folder, so every agent working in the repository uses the same instructions.
- **Automated reviews.** Kritika, an AI pull request reviewer from the home-operations community, runs inside the cluster with its own CloudNativePG database. It reviews every pull request, most of them Renovate updates, following that skill: an OpenAI model writes the review, a Claude model checks how confident it should be, and code embeddings let it search the repository for anything a change touches. Its runners can reach the internet to read upstream changelogs but are blocked from my home network. When a Renovate update is set to merge on its own, Kritika's review is the last look before it rolls out.

The agents do the legwork of reading changelogs, release notes and rendered manifests; I decide what merges.

## Why I run it

It is where I learn how production infrastructure behaves: what breaks during an upgrade, how storage recovers when a node goes down, and how much of that can be automated so it never needs a manual fix. Most of what I know about Kubernetes, GitOps and observability I learned here first.
