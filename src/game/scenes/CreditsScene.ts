import { Scene } from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
import { createPanel, addHintText } from '../core/ui';
import { gameDatabase } from '../systems/GameDatabase';
import { NavigationKeys } from '../systems/NavigationKeys';

export class CreditsScene extends Scene {
  private navigation!: NavigationKeys;

  constructor() {
    super(SceneKeys.Credits);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0d0a0f');
    this.navigation = new NavigationKeys(this);

    createPanel(this, 78, 42, 804, 454, 'Foundation Credits');

    this.add.text(110, 78, 'Mausoleum 2.2: Lanchyn', {
      fontFamily: 'Georgia',
      fontSize: '34px',
      color: '#efe7d7'
    });

    this.add.text(110, 134, gameDatabase.dialogues.credits.join('\n\n'), {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#dac9b0',
      wordWrap: { width: 740 }
    });

    addHintText(this, 110, 430, 'Esc returns to the main menu.\nTODO: Replace these provisional credits with the final team, localization, audio, art, and special thanks list.');
  }

  update(): void {
    if (this.navigation.cancelPressed() || this.navigation.confirmPressed()) {
      this.scene.start(SceneKeys.MainMenu);
    }
  }
}
