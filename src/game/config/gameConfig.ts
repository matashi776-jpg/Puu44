import { AUTO, Scale } from 'phaser';
import type { Types } from 'phaser';
import { BootScene } from '../scenes/BootScene';
import { PreloadScene } from '../scenes/PreloadScene';
import { MainMenuScene } from '../scenes/MainMenuScene';
import { WorldMapScene } from '../scenes/WorldMapScene';
import { BattleScene } from '../scenes/BattleScene';
import { HeroScene } from '../scenes/HeroScene';
import { RitualScene } from '../scenes/RitualScene';
import { CreditsScene } from '../scenes/CreditsScene';

export const GAME_WIDTH = 960;
export const GAME_HEIGHT = 540;

export const createGameConfig = (parent: string): Types.Core.GameConfig => ({
  type: AUTO,
  parent,
  width: GAME_WIDTH,
  height: GAME_HEIGHT,
  backgroundColor: '#100d12',
  pixelArt: true,
  antialias: false,
  roundPixels: true,
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
    width: GAME_WIDTH,
    height: GAME_HEIGHT
  },
  scene: [
    BootScene,
    PreloadScene,
    MainMenuScene,
    WorldMapScene,
    BattleScene,
    HeroScene,
    RitualScene,
    CreditsScene
  ]
});
