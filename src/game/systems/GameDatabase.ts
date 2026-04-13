import borislavaData from '../data/heroes/borislava.json';
import martaData from '../data/heroes/marta.json';
import nazarData from '../data/heroes/nazar.json';
import relicsData from '../data/items/relics.json';
import ritualsData from '../data/items/rituals.json';
import dialoguesData from '../data/lore/dialogues.json';
import lanchynUnitsData from '../data/units/lanchyn_units.json';
import structureUnitsData from '../data/units/structure_units.json';
import type {
  DialogueBank,
  HeroRecord,
  RelicRecord,
  RitualRecord,
  UnitRecord
} from '../core/types';

const heroes = [nazarData, martaData, borislavaData] as HeroRecord[];
const rituals = ritualsData as RitualRecord[];
const relics = relicsData as RelicRecord[];
const lanchynUnits = lanchynUnitsData as UnitRecord[];
const structureUnits = structureUnitsData as UnitRecord[];
const dialogues = dialoguesData as DialogueBank;

export const gameDatabase = {
  heroes,
  rituals,
  relics,
  dialogues,
  units: {
    lanchyn: lanchynUnits,
    structure: structureUnits
  },
  heroById(heroId?: string): HeroRecord {
    return heroes.find((hero) => hero.id === heroId) ?? heroes[0];
  }
};
