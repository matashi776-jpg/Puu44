import { Scene } from 'phaser';
import { SceneKeys } from '../config/sceneKeys';

export class BootScene extends Scene {
  constructor() {
    super(SceneKeys.Boot);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#100d12');
    this.add.text(64, 104, 'Mausoleum 2.2: Lanchyn', {
      fontFamily: 'Georgia',
      fontSize: '28px',
      color: '#efe7d7'
    });
    this.add.text(64, 148, 'Booting the first playable repository foundation...', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#ac9f8d'
    });

    this.time.delayedCall(120, () => {
      this.scene.start(SceneKeys.Preload);
    });
  }
}
