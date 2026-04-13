import battleMapUrl from '../data/maps/battle_01.tmj?url';
import worldMapUrl from '../data/maps/world_01.tmj?url';
import menuThemeUrl from '../assets/audio/music/menu_theme.wav';
import confirmSfxUrl from '../assets/audio/sfx/confirm.wav';
import borislavaPortraitUrl from '../assets/portraits/borislava.png';
import martaPortraitUrl from '../assets/portraits/marta.png';
import nazarPortraitUrl from '../assets/portraits/nazar.png';
import graveWardenSpriteUrl from '../assets/sprites/grave_warden.png';
import knotlingSpriteUrl from '../assets/sprites/knotling.png';
import mournerSpriteUrl from '../assets/sprites/mourner.png';
import nazarWardSpriteUrl from '../assets/sprites/nazar_ward.png';
import smokeReaderSpriteUrl from '../assets/sprites/smoke_reader.png';
import threadKeeperSpriteUrl from '../assets/sprites/thread_keeper.png';
import worldTilesUrl from '../assets/tiles/world_tiles.png';

export const AssetKeys = {
  WorldMap: 'map-world-01',
  BattleMap: 'map-battle-01',
  WorldTiles: 'tiles-world',
  MenuTheme: 'audio-menu-theme',
  ConfirmSfx: 'audio-confirm',
  NazarPortrait: 'portrait-nazar',
  MartaPortrait: 'portrait-marta',
  BorislavaPortrait: 'portrait-borislava',
  NazarWard: 'unit-nazar-ward',
  SmokeReader: 'unit-smoke-reader',
  ThreadKeeper: 'unit-thread-keeper',
  GraveWarden: 'unit-grave-warden',
  Knotling: 'unit-knotling',
  Mourner: 'unit-mourner'
} as const;

interface AssetFile {
  key: string;
  url: string;
}

interface AudioAssetFile extends AssetFile {
  urls: string[];
}

// TODO: Replace temporary portraits, sprites, music, and tiles with original production art and audio.
export const assetManifest: {
  images: AssetFile[];
  audio: AudioAssetFile[];
  tilemaps: AssetFile[];
} = {
  images: [
    { key: AssetKeys.WorldTiles, url: worldTilesUrl },
    { key: AssetKeys.NazarPortrait, url: nazarPortraitUrl },
    { key: AssetKeys.MartaPortrait, url: martaPortraitUrl },
    { key: AssetKeys.BorislavaPortrait, url: borislavaPortraitUrl },
    { key: AssetKeys.NazarWard, url: nazarWardSpriteUrl },
    { key: AssetKeys.SmokeReader, url: smokeReaderSpriteUrl },
    { key: AssetKeys.ThreadKeeper, url: threadKeeperSpriteUrl },
    { key: AssetKeys.GraveWarden, url: graveWardenSpriteUrl },
    { key: AssetKeys.Knotling, url: knotlingSpriteUrl },
    { key: AssetKeys.Mourner, url: mournerSpriteUrl }
  ],
  audio: [
    { key: AssetKeys.MenuTheme, url: menuThemeUrl, urls: [menuThemeUrl] },
    { key: AssetKeys.ConfirmSfx, url: confirmSfxUrl, urls: [confirmSfxUrl] }
  ],
  tilemaps: [
    { key: AssetKeys.WorldMap, url: worldMapUrl },
    { key: AssetKeys.BattleMap, url: battleMapUrl }
  ]
};
