export interface HeroRecord {
  id: string;
  name: string;
  title: string;
  portraitKey: string;
  affinity: string;
  battleRole: string;
  worldRole: string;
  hp: number;
  faith: number;
  will: number;
  threads: number;
  summary: string;
}

export interface UnitRecord {
  id: string;
  name: string;
  spriteKey: string;
  faction: string;
  role: string;
  attack: number;
  defense: number;
  faith: number;
  summary: string;
}

export interface RitualRecord {
  id: string;
  name: string;
  cost: string;
  domain: string;
  summary: string;
}

export interface RelicRecord {
  id: string;
  name: string;
  slot: string;
  effect: string;
}

export interface DialogueBank {
  mainMenuIntro: string;
  worldMapLocations: Record<string, string>;
  battlePrompts: {
    opening: string;
    placeholder: string;
    victory: string;
  };
  credits: string[];
}
