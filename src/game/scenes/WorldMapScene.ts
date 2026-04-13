import { Input, Scene } from 'phaser';
import { AssetKeys } from '../config/assets';
import { SceneKeys } from '../config/sceneKeys';
import { createPanel, addHintText } from '../core/ui';
import { gameDatabase } from '../systems/GameDatabase';
import { NavigationKeys } from '../systems/NavigationKeys';

interface LocationMarker {
  id: string;
  name: string;
  note: string;
  marker: Phaser.GameObjects.Rectangle;
  label: Phaser.GameObjects.Text;
}

export class WorldMapScene extends Scene {
  private navigation!: NavigationKeys;
  private battleKey!: Phaser.Input.Keyboard.Key;
  private heroesKey!: Phaser.Input.Keyboard.Key;
  private ritualsKey!: Phaser.Input.Keyboard.Key;
  private locations: LocationMarker[] = [];
  private selectedIndex = 0;
  private detailText!: Phaser.GameObjects.Text;

  constructor() {
    super(SceneKeys.WorldMap);
  }

  create(): void {
    this.cameras.main.setBackgroundColor('#0f0b10');
    this.navigation = new NavigationKeys(this);
    this.battleKey = this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.B);
    this.heroesKey = this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.H);
    this.ritualsKey = this.input.keyboard!.addKey(Input.Keyboard.KeyCodes.R);

    createPanel(this, 24, 24, 616, 404, 'World Map');
    createPanel(this, 656, 24, 280, 404, 'Lanchyn Road Notes');
    createPanel(this, 24, 444, 912, 72, 'Travel Controls');

    this.add.text(46, 48, 'Sector Lanchyn', {
      fontFamily: 'Georgia',
      fontSize: '28px',
      color: '#efe7d7'
    });

    const map = this.make.tilemap({ key: AssetKeys.WorldMap });
    const tileset = map.addTilesetImage('world_tiles', AssetKeys.WorldTiles);
    const layer = tileset ? map.createLayer('ground', tileset, 56, 86) : null;
    layer?.setScale(2);

    const objectLayer = map.getObjectLayer('locations');
    this.locations = (objectLayer?.objects ?? []).map((object) => {
      const locationId = String(object.properties?.find((property) => property.name === 'locationId')?.value ?? object.name ?? 'unknown');
      const marker = this.add.rectangle(56 + object.x * 2, 86 + object.y * 2, 12, 12, 0x82604d);
      const label = this.add.text(marker.x + 10, marker.y - 16, object.name ?? 'Unknown', {
        fontFamily: 'monospace',
        fontSize: '11px',
        color: '#bda98a'
      });

      return {
        id: locationId,
        name: object.name ?? 'Unknown',
        note: gameDatabase.dialogues.worldMapLocations[locationId] ?? 'This place still needs authored encounter text.',
        marker,
        label
      };
    });

    this.add.image(796, 110, AssetKeys.BorislavaPortrait).setScale(2.1);
    this.add.text(694, 198, gameDatabase.heroById('borislava').name, {
      fontFamily: 'Georgia',
      fontSize: '24px',
      color: '#efe7d7'
    });
    this.add.text(694, 232, 'Scouting the smoke-thread routes across the barrier edge.', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#c5b59a',
      wordWrap: { width: 208 }
    });

    this.detailText = this.add.text(694, 298, '', {
      fontFamily: 'monospace',
      fontSize: '12px',
      color: '#d6c5ad',
      wordWrap: { width: 216 }
    });

    addHintText(this, 48, 468, 'Move between marked sites with ← → / A D. Enter or B opens the placeholder battle scene. H opens heroes, R opens rituals, Esc returns to menu.\nTODO: Replace placeholder map art, add route logic, events, and authored node content.');

    this.updateSelection();
  }

  update(): void {
    if (this.navigation.leftPressed()) {
      this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex - 1, 0, this.locations.length);
      this.updateSelection();
    }

    if (this.navigation.rightPressed()) {
      this.selectedIndex = Phaser.Math.Wrap(this.selectedIndex + 1, 0, this.locations.length);
      this.updateSelection();
    }

    if (this.navigation.confirmPressed() || Input.Keyboard.JustDown(this.battleKey)) {
      this.sound.play(AssetKeys.ConfirmSfx, { volume: 0.15 });
      this.scene.start(SceneKeys.Battle, { locationId: this.locations[this.selectedIndex]?.id });
    }

    if (Input.Keyboard.JustDown(this.heroesKey)) {
      this.scene.start(SceneKeys.Hero, { heroId: 'borislava', returnScene: SceneKeys.WorldMap });
    }

    if (Input.Keyboard.JustDown(this.ritualsKey)) {
      this.scene.start(SceneKeys.Ritual, { returnScene: SceneKeys.WorldMap });
    }

    if (this.navigation.cancelPressed()) {
      this.scene.start(SceneKeys.MainMenu);
    }
  }

  private updateSelection(): void {
    this.locations.forEach((location, index) => {
      const isSelected = index === this.selectedIndex;
      location.marker.setFillStyle(isSelected ? 0xd1a269 : 0x82604d);
      location.marker.setSize(isSelected ? 16 : 12, isSelected ? 16 : 12);
      location.label.setColor(isSelected ? '#efe7d7' : '#bda98a');
    });

    const selectedLocation = this.locations[this.selectedIndex];
    this.detailText.setText(`${selectedLocation.name}\n\n${selectedLocation.note}`);
  }
}
