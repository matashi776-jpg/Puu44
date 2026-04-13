import { Scene } from 'phaser';
import { AssetKeys } from '../config/assets';
import { SceneKeys } from '../config/sceneKeys';
import { createPanel, addHintText } from '../core/ui';
import { gameDatabase } from '../systems/GameDatabase';
import { NavigationKeys } from '../systems/NavigationKeys';

interface BattleSceneData {
  locationId?: string;
}

export class BattleScene extends Scene {
  private navigation!: NavigationKeys;
  private locationId = 'barrier-crossing';
  private readonly commands = ['Strike', 'Thread Ward', 'Retreat'];
  private selectedIndex = 0;
  private commandTexts: Phaser.GameObjects.Text[] = [];
  private statusText!: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKeys.Battle);
  }

  init(data: BattleSceneData): void {
    this.locationId = data.locationId ?? 'barrier-crossing';
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0f0a0e');
    this.navigation = new NavigationKeys(this);

    createPanel(this, 24, 24, 560, 334, 'Battlefield');
    createPanel(this, 600, 24, 336, 334, 'Engagement Notes');
    createPanel(this, 24, 376, 912, 140, 'Command Tray');

    const map = this.make.tilemap({ key: AssetKeys.BattleMap });
    const tileset = map.addTilesetImage('world_tiles', AssetKeys.WorldTiles);
    const layer = tileset ? map.createLayer('ground', tileset, 54, 70) : null;
    layer?.setScale(3);

    this.add.text(622, 52, 'Placeholder battle loop', {
      fontFamily: 'Georgia',
      fontSize: '26px',
      color: '#efe7d7'
    });
    this.add.text(622, 92, `Current site: ${this.locationId}`, {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#c6b59a'
    });

    this.drawUnitColumn(92, 106, gameDatabase.units.lanchyn, 'Lanchyn party');
    this.drawUnitColumn(392, 106, gameDatabase.units.structure, 'Dead structure');

    this.statusText = this.add.text(622, 138, gameDatabase.dialogues.battlePrompts.opening, {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#dccdb8',
      wordWrap: { width: 284 }
    });

    this.commandTexts = this.commands.map((command, index) => {
      return this.add.text(52 + index * 218, 430, command, {
        fontFamily: 'Georgia',
        fontSize: '26px',
        color: '#8e8171'
      });
    });

    addHintText(this, 52, 474, 'Use ← → to change commands. Enter performs a placeholder action. Esc returns to the world map.\nTODO: Replace this scene with initiative, abilities, damage resolution, and authored encounter scripting.');

    this.updateCommandVisuals();
  }

  update(): void {
    if (this.navigation.leftPressed()) {
      this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex - 1, 0, this.commands.length);
      this.updateCommandVisuals();
    }

    if (this.navigation.rightPressed()) {
      this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex + 1, 0, this.commands.length);
      this.updateCommandVisuals();
    }

    if (this.navigation.confirmPressed()) {
      const command = this.commands[this.selectedIndex];
      this.sound.play(AssetKeys.ConfirmSfx, { volume: 0.15 });

      if (command === 'Retreat') {
        this.statusText.setText(gameDatabase.dialogues.battlePrompts.victory);
        this.scene.start(SceneKeys.WorldMap);
        return;
      }

      this.statusText.setText(`${command}: ${gameDatabase.dialogues.battlePrompts.placeholder}`);
    }

    if (this.navigation.cancelPressed()) {
      this.scene.start(SceneKeys.WorldMap);
    }
  }

  private drawUnitColumn(x: number, y: number, units: typeof gameDatabase.units.lanchyn, title: string): void {
    this.add.text(x, y - 28, title, {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#d2c1a5'
    });

    units.slice(0, 3).forEach((unit, index) => {
      const sprite = this.add.image(x + 16, y + index * 70, unit.spriteKey).setScale(2.5);
      sprite.setTint(index % 2 === 0 ? 0xffffff : 0xe4d5be);
      this.add.text(x + 42, y - 14 + index * 70, unit.name, {
        fontFamily: 'Georgia',
        fontSize: '18px',
        color: '#efe7d7'
      });
      this.add.text(x + 42, y + 8 + index * 70, `${unit.role} • ATK ${unit.attack} • DEF ${unit.defense}`, {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#baa98d'
      });
    });
  }

  private updateCommandVisuals(): void {
    this.commandTexts.forEach((text, index) => {
      const isSelected = index === this.selectedIndex;
      text.setColor(isSelected ? '#efe7d7' : '#8e8171');
      text.setScale(isSelected ? 1.03 : 1);
    });
  }
}
