import type { Scene } from 'phaser';

export const createPanel = (
  scene: Scene,
  x: number,
  y: number,
  width: number,
  height: number,
  title?: string
): void => {
  const panel = scene.add.graphics();
  panel.fillStyle(0x140f18, 0.9);
  panel.fillRoundedRect(x, y, width, height, 10);
  panel.lineStyle(2, 0xc2aa82, 0.85);
  panel.strokeRoundedRect(x, y, width, height, 10);

  if (title) {
    scene.add.text(x + 14, y + 10, title, {
      fontFamily: 'monospace',
      fontSize: '14px',
      color: '#d7c5a3'
    });
  }
};

export const addHintText = (scene: Scene, x: number, y: number, text: string): void => {
  scene.add.text(x, y, text, {
    fontFamily: 'monospace',
    fontSize: '12px',
    color: '#a09386',
    wordWrap: { width: 420 }
  });
};
