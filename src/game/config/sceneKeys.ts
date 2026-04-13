export const SceneKeys = {
  Boot: 'BootScene',
  Preload: 'PreloadScene',
  MainMenu: 'MainMenuScene',
  WorldMap: 'WorldMapScene',
  Battle: 'BattleScene',
  Hero: 'HeroScene',
  Ritual: 'RitualScene',
  Credits: 'CreditsScene'
} as const;

export type SceneKey = (typeof SceneKeys)[keyof typeof SceneKeys];
