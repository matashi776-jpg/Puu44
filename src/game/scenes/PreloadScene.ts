import { Scene } from 'phaser';
import { assetManifest } from '../config/assets';
import { SceneKeys } from '../config/sceneKeys';

export class PreloadScene extends Scene {
  constructor() {
    super(SceneKeys.Preload);
  }

  preload(): void {
    this.cameras.main.setBackgroundColor('#100d12');

    this.add.text(64, 84, 'Preloading placeholder assets', {
      fontFamily: 'Georgia',
      fontSize: '24px',
      color: '#efe7d7'
    });

    const progressBox = this.add.graphics();
    progressBox.fillStyle(0x201922, 0.95);
    progressBox.fillRoundedRect(64, 148, 420, 26, 8);

    const progressBar = this.add.graphics();
    const statusText = this.add.text(64, 188, 'Preparing smoke, maps, and names…', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#bfae97'
    });

    this.load.on('progress', (value: number) => {
      progressBar.clear();
      progressBar.fillStyle(0xb58457, 1);
      progressBar.fillRoundedRect(68, 152, 412 * value, 18, 6);
      statusText.setText(`Loaded ${Math.round(value * 100)}% of placeholder foundation assets.`);
    });

    assetManifest.images.forEach((asset) => {
      this.load.image(asset.key, asset.url);
    });

    assetManifest.audio.forEach((asset) => {
      this.load.audio(asset.key, asset.urls);
    });

    assetManifest.tilemaps.forEach((asset) => {
      this.load.tilemapTiledJSON(asset.key, asset.url);
    });
  }

  create(): void {
    this.scene.start(SceneKeys.MainMenu);
  }
}
