import { Scene } from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
import type { SceneKey } from '../config/sceneKeys';
import { createPanel, addHintText } from '../core/ui';
import { gameDatabase } from '../systems/GameDatabase';
import { NavigationKeys } from '../systems/NavigationKeys';

interface RitualSceneData {
  returnScene?: SceneKey;
}

export class RitualScene extends Scene {
  private navigation!: NavigationKeys;
  private returnScene: SceneKey = SceneKeys.MainMenu;
  private selectedIndex = 0;
  private ritualTexts: Phaser.GameObjects.Text[] = [];
  private detailText!: Phaser.GameObjects.Text;
  private relicText!: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKeys.Ritual);
  }

  init(data: RitualSceneData): void {
    this.returnScene = data.returnScene ?? SceneKeys.MainMenu;
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0f0b11');
    this.navigation = new NavigationKeys(this);

    createPanel(this, 28, 28, 320, 484, 'Ritual Ledger');
    createPanel(this, 368, 28, 284, 484, 'Ritual Detail');
    createPanel(this, 672, 28, 260, 484, 'Relics');

    this.ritualTexts = gameDatabase.rituals.map((ritual, index) => {
      return this.add.text(54, 64 + index * 62, ritual.name, {
        fontFamily: 'Georgia',
        fontSize: '22px',
        color: '#8e8171'
      });
    });

    this.detailText = this.add.text(392, 68, '', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#ddccb4',
      wordWrap: { width: 236 }
    });

    this.relicText = this.add.text(696, 68, gameDatabase.relics.map((relic) => `${relic.name}\n${relic.effect}`).join('\n\n'), {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#d1c0a5',
      wordWrap: { width: 210 }
    });

    addHintText(this, 696, 428, 'Use ↑ ↓ to move through placeholder ritual records. Esc returns.\nTODO: Attach costs, prerequisites, map interactions, relic equip rules, and authored consequences.');

    this.updateSelection();
  }

  update(): void {
    if (this.navigation.upPressed()) {
      this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex - 1, 0, gameDatabase.rituals.length);
      this.updateSelection();
    }

    if (this.navigation.downPressed()) {
      this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex + 1, 0, gameDatabase.rituals.length);
      this.updateSelection();
    }

    if (this.navigation.cancelPressed()) {
      this.scene.start(this.returnScene);
    }
  }

  private updateSelection(): void {
    this.ritualTexts.forEach((text, index) => {
      const isSelected = index === this.selectedIndex;
      text.setColor(isSelected ? '#efe7d7' : '#8e8171');
      text.setScale(isSelected ? 1.02 : 1);
    });

    const ritual = gameDatabase.rituals[this.selectedIndex];
    this.detailText.setText(`${ritual.name}\n\nDomain: ${ritual.domain}\nCost: ${ritual.cost}\n\n${ritual.summary}`);
    this.relicText.setText(gameDatabase.relics.map((relic) => `${relic.name}\n${relic.effect}`).join('\n\n'));
  }
}
