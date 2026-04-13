import { Scene } from 'phaser';
import { AssetKeys } from '../config/assets';
import { SceneKeys } from '../config/sceneKeys';
import { createPanel, addHintText } from '../core/ui';
import { gameDatabase } from '../systems/GameDatabase';
import { NavigationKeys } from '../systems/NavigationKeys';

export class MainMenuScene extends Scene {
  private readonly menuItems = [
    { label: 'Begin the Lanchyn Road', scene: SceneKeys.WorldMap },
    { label: 'Inspect the Canonical Heroes', scene: SceneKeys.Hero },
    { label: 'Read Ritual and Relic Notes', scene: SceneKeys.Ritual },
    { label: 'View Foundation Credits', scene: SceneKeys.Credits }
  ];

  private navigation!: NavigationKeys;
  private selectedIndex = 0;
  private menuTexts: Phaser.GameObjects.Text[] = [];

  constructor() {
    super(SceneKeys.MainMenu);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#110d12');
    this.navigation = new NavigationKeys(this);

    createPanel(this, 42, 36, 876, 112, 'Main Menu');
    createPanel(this, 42, 168, 430, 318, 'Project Tone');
    createPanel(this, 488, 168, 430, 318, 'Routes');

    this.add.text(64, 60, 'Mausoleum 2.2: Lanchyn', {
      fontFamily: 'Georgia',
      fontSize: '34px',
      color: '#efe7d7'
    });
    this.add.text(64, 100, 'Original dark fantasy / folk horror tactical RPG foundation', {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#b7ab99'
    });

    addHintText(this, 64, 202, gameDatabase.dialogues.mainMenuIntro);

    const heroNames = gameDatabase.heroes.map((hero) => hero.name).join(' • ');
    this.add.text(64, 332, `Canonical hero roster: ${heroNames}`, {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#d8c5a8',
      wordWrap: { width: 360 }
    });
    this.add.text(64, 382, 'Foundation status: scenes, map loading, data stubs, keyboard controls, and build pipeline are live.', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#c8b699',
      wordWrap: { width: 360 }
    });

    this.menuTexts = this.menuItems.map((item, index) => {
      return this.add.text(516, 218 + index * 58, item.label, {
        fontFamily: 'Georgia',
        fontSize: '24px',
        color: '#8e8171'
      });
    });

    this.add.image(832, 92, AssetKeys.NazarPortrait).setScale(1.5).setAlpha(0.82);
    this.add.image(878, 92, AssetKeys.MartaPortrait).setScale(1.5).setAlpha(0.82);

    addHintText(this, 516, 412, 'Use ↑ ↓ or W S to move, Enter / Space to select.\nTODO: Replace menu framing, music loop, and title art with final production assets.');

    this.updateMenuVisuals();
  }

  update(): void {
    if (this.navigation.upPressed()) {
      this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex - 1, 0, this.menuItems.length);
      this.updateMenuVisuals();
    }

    if (this.navigation.downPressed()) {
      this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex + 1, 0, this.menuItems.length);
      this.updateMenuVisuals();
    }

    if (this.navigation.confirmPressed()) {
      this.sound.play(AssetKeys.ConfirmSfx, { volume: 0.15 });
      this.scene.start(this.menuItems[this.selectedIndex].scene);
    }
  }

  private updateMenuVisuals(): void {
    this.menuTexts.forEach((text, index) => {
      const isSelected = index === this.selectedIndex;
      text.setColor(isSelected ? '#efe7d7' : '#8e8171');
      text.setScale(isSelected ? 1.04 : 1);
    });
  }
}
