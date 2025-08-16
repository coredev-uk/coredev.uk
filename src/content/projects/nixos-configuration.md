---
title: "NixOS Configuration"
description: "Personal NixOS configuration files and system setup"
date: "2022-01-25"
technologies: ["Nix", "Linux", "System Configuration"]
github: "https://github.com/coredev-uk/nixos"
status: "active"
featured: true
---

# NixOS Configuration

My personal NixOS configuration files that define my entire system setup in a declarative way. This repository contains all the configuration needed to reproduce my development environment and system setup.

## Features

- **Declarative Configuration**: Complete system configuration defined as code
- **Reproducible Builds**: Exact system state can be reproduced on any machine
- **Home Manager Integration**: User environment management
- **Custom Packages**: Personal package definitions and overrides
- **Development Environment**: Optimized setup for software development

## Technologies Used

- **Nix**: The purely functional package manager
- **NixOS**: Linux distribution built on Nix
- **Home Manager**: Declarative dotfile management
- **Flakes**: Modern Nix configuration approach

## Configuration Highlights

### System Features
- Custom kernel configurations
- Hardware-specific optimizations
- Security hardening
- Performance tuning

### Development Setup
- Language-specific development environments
- Editor configurations (Neovim, VSCode)
- Terminal setup with modern tools
- Git configuration and aliases

### Desktop Environment
- Window manager configuration
- Theme and styling
- Application defaults
- Keyboard shortcuts

## Getting Started

```bash
# Clone the repository
git clone https://github.com/coredev-uk/nixos.git

# Apply configuration
sudo nixos-rebuild switch --flake .#hostname
```

## Key Benefits

- **Reproducibility**: Exact system state across multiple machines
- **Rollback Capability**: Easy system rollbacks if issues occur
- **Atomic Updates**: System changes are atomic and safe
- **Dependency Management**: Automatic dependency resolution

This configuration represents years of refinement and optimization for a productive development environment while maintaining system stability and security.
