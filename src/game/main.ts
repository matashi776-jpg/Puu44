import { Game } from 'phaser';
import { createGameConfig } from './config/gameConfig';

const StartGame = (parent: string): Game => {
  return new Game(createGameConfig(parent));
};

export default StartGame;
