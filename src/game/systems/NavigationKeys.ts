import { Input, Scene } from 'phaser';
import type { Input as PhaserInput } from 'phaser';

export class NavigationKeys {
  private readonly upKeys: PhaserInput.Keyboard.Key[];
  private readonly downKeys: PhaserInput.Keyboard.Key[];
  private readonly leftKeys: PhaserInput.Keyboard.Key[];
  private readonly rightKeys: PhaserInput.Keyboard.Key[];
  private readonly confirmKeys: PhaserInput.Keyboard.Key[];
  private readonly cancelKeys: PhaserInput.Keyboard.Key[];

  constructor(scene: Scene) {
    const keyboard = scene.input.keyboard;

    if (!keyboard) {
      throw new Error('Keyboard input is not available in this scene.');
    }

    this.upKeys = [
      keyboard.addKey(Input.Keyboard.KeyCodes.UP),
      keyboard.addKey(Input.Keyboard.KeyCodes.W)
    ];
    this.downKeys = [
      keyboard.addKey(Input.Keyboard.KeyCodes.DOWN),
      keyboard.addKey(Input.Keyboard.KeyCodes.S)
    ];
    this.leftKeys = [
      keyboard.addKey(Input.Keyboard.KeyCodes.LEFT),
      keyboard.addKey(Input.Keyboard.KeyCodes.A)
    ];
    this.rightKeys = [
      keyboard.addKey(Input.Keyboard.KeyCodes.RIGHT),
      keyboard.addKey(Input.Keyboard.KeyCodes.D)
    ];
    this.confirmKeys = [
      keyboard.addKey(Input.Keyboard.KeyCodes.ENTER),
      keyboard.addKey(Input.Keyboard.KeyCodes.SPACE)
    ];
    this.cancelKeys = [keyboard.addKey(Input.Keyboard.KeyCodes.ESC)];
  }

  upPressed(): boolean {
    return this.upKeys.some((key) => Input.Keyboard.JustDown(key));
  }

  downPressed(): boolean {
    return this.downKeys.some((key) => Input.Keyboard.JustDown(key));
  }

  leftPressed(): boolean {
    return this.leftKeys.some((key) => Input.Keyboard.JustDown(key));
  }

  rightPressed(): boolean {
    return this.rightKeys.some((key) => Input.Keyboard.JustDown(key));
  }

  confirmPressed(): boolean {
    return this.confirmKeys.some((key) => Input.Keyboard.JustDown(key));
  }

  cancelPressed(): boolean {
    return this.cancelKeys.some((key) => Input.Keyboard.JustDown(key));
  }
}
