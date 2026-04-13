import { Scene } from 'phaser';
import { SceneKeys } from '../config/sceneKeys';
import { createPanel, addHintText } from '../core/ui';
import { gameDatabase } from '../systems/GameDatabase';
import { NavigationKeys } from '../systems/NavigationKeys';

interface HeroSceneData {
  heroId?: string;
  returnScene?: string;
}

export class HeroScene extends Scene {
  private navigation!: NavigationKeys;
  private returnScene = SceneKeys.MainMenu;
  private selectedIndex = 0;
  private portrait!: Phaser.GameObjects.Image;
  private nameText!: Phaser.GameObjects.Text;
  private titleText!: Phaser.GameObjects.Text;
  private summaryText!: Phaser.GameObjects.Text;
  private statsText!: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKeys.Hero);
  }

  init(data: HeroSceneData): void {
    this.returnScene = data.returnScene ?? SceneKeys.MainMenu;
    this.selectedIndex = Math.max(0, gameDatabase.heroes.findIndex((hero) => hero.id === data.heroId));
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0e0b10');
    this.navigation = new NavigationKeys(this);

    createPanel(this, 34, 26, 316, 488, 'Portrait');
    createPanel(this, 370, 26, 556, 356, 'Hero Record');
    createPanel(this, 370, 398, 556, 116, 'Controls');

    this.portrait = this.add.image(192, 232, gameDatabase.heroes[this.selectedIndex].portraitKey).setScale(4.2);
    this.nameText = this.add.text(398, 58, '', {
      fontFamily: 'Georgia',
      fontSize: '34px',
      color: '#efe7d7'
    });
    this.titleText = this.add.text(398, 104, '', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#ccbba1'
    });
    this.summaryText = this.add.text(398, 152, '', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#d8c7ad',
      wordWrap: { width: 500 }
    });
    this.statsText = this.add.text(398, 292, '', {
      fontFamily: 'monospace',
      fontSize: '13px',
      color: '#bba88d',
      wordWrap: { width: 500 }
    });

    addHintText(this, 398, 430, 'Use ← → to browse Nazar, Marta, and Borislava. Esc returns to the previous scene.\nTODO: Replace placeholder portraits with production portrait sheets and attach progression, gear, and dialogue state.');

    this.renderHero();
  }

  update(): void {
    if (this.navigation.leftPressed()) {
      this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex - 1, 0, gameDatabase.heroes.length);
      this.renderHero();
    }

    if (this.navigation.rightPressed()) {
      this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex + 1, 0, gameDatabase.heroes.length);
      this.renderHero();
    }

    if (this.navigation.cancelPressed()) {
      this.scene.start(this.returnScene);
    }
  }

  private renderHero(): void {
    const hero = gameDatabase.heroes[this.selectedIndex];
    this.portrait.setTexture(hero.portraitKey);
    this.nameText.setText(hero.name);
    this.titleText.setText(`${hero.title} • Affinity: ${hero.affinity}`);
    this.summaryText.setText(`${hero.summary}\n\nBattle role: ${hero.battleRole}\nWorld role: ${hero.worldRole}`);
    this.statsText.setText(`HP ${hero.hp}\nFaith ${hero.faith}\nWill ${hero.will}\nThreads ${hero.threads}`);
  }
}
