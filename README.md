# Mausoleum 2.2: Lanchyn

Original Phaser 3 + TypeScript + Vite browser game foundation for a dark fantasy / folk horror tactical RPG set around Lanchyn.

This repository currently provides a **first working foundation only**:
- scene flow
- keyboard navigation
- placeholder UI
- placeholder tilemaps
- placeholder hero/unit data
- placeholder portraits, sprites, and audio
- production-friendly static web build tooling

It does **not** claim to implement final combat, authored world progression, progression systems, or finished content yet.

## Prerequisites

- Node.js **20.19+** or **22.12+**
- npm **10+**

## Install

```bash
npm install
```

## Run the local development build

```bash
npm run dev
```

Default dev server: `http://localhost:8080`

## Build for static deployment

```bash
npm run build
```

The deployable output is written to `dist/`.

## Project structure

```text
src/
  main.ts
  styles.css
  game/
    config/
    core/
    scenes/
    systems/
    data/
    assets/
```

## Implemented scenes

- `BootScene`
- `PreloadScene`
- `MainMenuScene`
- `WorldMapScene`
- `BattleScene`
- `HeroScene`
- `RitualScene`
- `CreditsScene`

## Where to place future content

### Tiled maps

Place exported Tiled JSON maps in:

- `src/game/data/maps/`

Current placeholders:
- `world_01.tmj`
- `battle_01.tmj`

If you add new map filenames, update `src/game/config/assets.ts` so Phaser loads them.

### Hero portraits

Place portrait images in:

- `src/game/assets/portraits/`

Current placeholders:
- `nazar.png`
- `marta.png`
- `borislava.png`

### Unit sprites

Place unit sprites in:

- `src/game/assets/sprites/`

Current placeholders include both Lanchyn-side and structure-side stand-ins.

### Music and sound effects

Place music and SFX in:

- `src/game/assets/audio/music/`
- `src/game/assets/audio/sfx/`

Current placeholders:
- `menu_theme.wav`
- `confirm.wav`

## Data files

The first content stubs live in:

- `src/game/data/heroes/`
- `src/game/data/units/`
- `src/game/data/items/`
- `src/game/data/lore/`

## Controls

- `Main menu`: `W/S` or `↑/↓`, `Enter` / `Space`
- `World map`: `A/D` or `←/→`, `Enter` / `B`, `H`, `R`, `Esc`
- `Battle`: `A/D` or `←/→`, `Enter`, `Esc`
- `Hero codex`: `A/D` or `←/→`, `Esc`
- `Ritual ledger`: `W/S` or `↑/↓`, `Esc`
- `Credits`: `Enter` or `Esc`

## Placeholder policy

All current art, map, and audio assets are safe temporary placeholders created for repository setup only.

## TODO markers already in code

Search for `TODO:` to find the main insertion points for:
- final art replacement
- final music replacement
- authored maps and route logic
- real battle systems
- progression and item logic

## Validation checklist completed for this foundation

- Phaser 3 + TypeScript + Vite setup created
- strict TypeScript enabled
- scene registration wired
- Tiled JSON loading wired
- keyboard input system added
- placeholder assets use valid local paths
- static build target preserved
