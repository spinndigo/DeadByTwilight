import {
  UpdateGenRegressionPayload,
  UpdateHealthPayload,
  UpdateProgressPayload,
} from '../gamestateReducer';
import {Gen, Health, HealthChange, Survivor} from './types';

type UpdateGenProgressHelper = (
  gens: Array<Gen>,
  updatedGen: UpdateProgressPayload,
) => Array<Gen>;

type UpdateGenRegressionHelper = (
  gens: Array<Gen>,
  updatedGen: UpdateGenRegressionPayload,
) => Array<Gen>;

type UpdateSurvivorhealth = (
  survivors: Array<Survivor>,
  updatedSurvivor: UpdateHealthPayload,
) => Array<Survivor>;

export const applyGenDelta: UpdateGenProgressHelper = (gens, updatedGen) => {
  const newGens = gens.slice();
  const genIndex = newGens.findIndex(g => g.id === updatedGen.gen_id);
  const newProgress = Math.max(
    0,
    newGens[genIndex].progress + updatedGen.delta,
  ); // prevent negative progress
  newGens[genIndex] = {...newGens[genIndex], progress: newProgress};

  return newGens;
};

export const applyGenRegression: UpdateGenRegressionHelper = (
  gens,
  updatedGen,
) => {
  const newGens = gens.slice();
  const genIndex = newGens.findIndex(g => g.id === updatedGen.id);
  newGens[genIndex].isRegressing = updatedGen.isRegressing;
  return newGens;
};

type ApplyHealthDelta = (health: Health, healthChange: HealthChange) => Health;

const applyHealthDelta: ApplyHealthDelta = (health, healthChange) => {
  if (
    (health === 'HEALTHY' && healthChange === 'HEALED') ||
    (health === 'DEAD' && healthChange === 'HURT')
  ) {
    return health;
  }
  if (healthChange === 'HEALED') {
    if (health === 'DEAD') return health;
    if (health === 'DYING') return 'INJURED';
    if (health === 'INJURED') return 'HEALTHY';
  } else if (healthChange === 'HURT') {
    if (health === 'HEALTHY') return 'INJURED';
    if (health === 'INJURED') return 'DYING';
    if (health === 'DYING') return 'DEAD';
  }
  console.warn('survivor health state changed in unaccounted manner');
  return health; // should not happen
};

export const applySurvivorHealthDelta: UpdateSurvivorhealth = (
  survivors,
  updatedSurvivor,
) => {
  const newSurvivors = survivors.slice();
  const survivorIndex = newSurvivors.findIndex(
    s => s.id === updatedSurvivor.survivor_id,
  );
  const newHealth = applyHealthDelta(
    newSurvivors[survivorIndex].health,
    updatedSurvivor.healthChange,
  );
  newSurvivors[survivorIndex].health = newHealth;
  return newSurvivors;
};

export const addSurvivor = (
  survivors: Array<Survivor>,
  newSurvivor: Survivor,
) => {
  if (survivors.length < 4) {
    return [...survivors, newSurvivor];
  } else {
    return survivors;
  }
};
