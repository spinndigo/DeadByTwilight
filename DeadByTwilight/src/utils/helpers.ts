/* eslint-disable curly */
import {UpdateHealthPayload, UpdateProgressPayload} from '../gamestateReducer';
import {BASE_SURVIVOR_HEAL_RATE, BASE_GEN_REPAIR_RATE} from './constants';
import {GameElement, Gen, Health, HealthChange, Survivor} from './types';

type UpdateSurvivorhealth = (
  survivors: Array<Survivor>,
  updatedSurvivor: UpdateHealthPayload,
) => Array<Survivor>;

type UpdateProgressHelper<T extends GameElement> = (
  elements: Array<T>,
  updated: UpdateProgressPayload,
) => Array<T>;

type UpdateGenProgressHelper = UpdateProgressHelper<Gen>;
type UpdateSurvivorProgressHelper = UpdateProgressHelper<Survivor>;

export const applySurvivorProgressDelta: UpdateSurvivorProgressHelper = (
  elements,
  updated,
) => {
  const newElements = elements.slice();
  const elementIndex = newElements.findIndex(e => e.id === updated.id);
  const element = newElements[elementIndex];
  let newProgress = Math.min(
    100,
    Math.max(0, element.progress + updated.delta),
  );

  if (newProgress === 100) {
    element.health = applyHealthDelta(element.health, 'HEALED');
    newProgress = 0;
  }

  newElements[elementIndex] = {
    ...element,
    progress: newProgress,
  };

  return newElements;
};

export const applyGenProgressDelta: UpdateGenProgressHelper = (
  gens,
  updated,
) => {
  const newGens = gens.slice();
  const genIndex = newGens.findIndex(e => e.id === updated.id);
  const gen = newGens[genIndex];
  const newProgress = Math.min(100, Math.max(0, gen.progress + updated.delta)); // progress must be from [0,100]

  if (updated.delta < 0) {
    gen.isRegressing = true;
  } else {
    gen.isRegressing = false;
  }

  newGens[genIndex] = {
    ...gen,
    progress: newProgress,
  };

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

export const getInvalidInteractionMessage = (
  isKiller: boolean,
  subject: GameElement,
) => {
  const subjectIsSurvivor = isSurvivor(subject);
  if (subjectIsSurvivor && subject.health === 'DEAD') return 'Survivor is dead';
  if (!isKiller && subjectIsSurvivor && subject.health === 'HEALTHY')
    return 'Survivor is healthy';
  if (!subjectIsSurvivor && subject.progress >= 100)
    return 'Gen is operational';
  return '';
};

// no multiplying bonus for now
export const getProgressionRate = (element: GameElement) => {
  const elIsSurvivor = isSurvivor(element);
  const baseProgressRate = elIsSurvivor
    ? BASE_SURVIVOR_HEAL_RATE
    : BASE_GEN_REPAIR_RATE;

  return baseProgressRate;
};
