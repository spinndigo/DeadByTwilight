/* eslint-disable curly */
import {
  UpdateGenRegressionPayload,
  UpdateHealthPayload,
  UpdateProgressPayload,
} from '../gamestateReducer';
import {BASE_SURVIVOR_HEAL_RATE, BASE_GEN_REPAIR_RATE} from './constants';
import {GameElement, Gen, Health, HealthChange, Survivor} from './types';

type UpdateGenRegressionHelper = (
  gens: Array<Gen>,
  updatedGen: UpdateGenRegressionPayload,
) => Array<Gen>;

type UpdateSurvivorhealth = (
  survivors: Array<Survivor>,
  updatedSurvivor: UpdateHealthPayload,
) => Array<Survivor>;

type UpdateProgressHelper = <T extends GameElement>(
  elements: Array<T>,
  updated: UpdateProgressPayload,
) => Array<T>;

export const applyProgressDelta: UpdateProgressHelper = (elements, updated) => {
  const newElements = elements.slice();
  const elementIndex = newElements.findIndex(e => e.id === updated.id);
  const element = newElements[elementIndex];
  const elIsSurvivor = isSurvivor(element);
  let newProgress = Math.min(
    100,
    Math.max(0, element.progress + updated.delta),
  ); // progress must be from [0,100]

  if (elIsSurvivor && newProgress === 100) {
    element.health = applyHealthDelta(element.health, 'HEALED'); // heal if necessary
    newProgress = 0; // reset progress
  }

  newElements[elementIndex] = {
    ...element,
    progress: newProgress,
  };

  return newElements;
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
  newSurvivors[survivorIndex].progress = 0;
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

export function isSurvivor(
  element: GameElement | undefined,
): element is Survivor {
  return (element as Survivor).health !== undefined;
}

export const getProgressionRate = (element: GameElement) => {
  const elIsSurvivor = isSurvivor(element);
  const baseProgressRate = elIsSurvivor
    ? BASE_SURVIVOR_HEAL_RATE
    : BASE_GEN_REPAIR_RATE;

  return baseProgressRate;
};
