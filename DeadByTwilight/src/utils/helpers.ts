import {UpdateProgressPayload} from '../gamestateReducer';
import {Generator} from './types';

type UpdateGenHelper = (
  gens: Array<Generator>,
  updatedGen: UpdateProgressPayload,
) => Array<Generator>;

export const applyGenDelta: UpdateGenHelper = (gens, updatedGen) => {
  const newGens = gens.slice();
  const genIndex = newGens.findIndex(g => g.id === updatedGen.gen_id);
  const newProgress = Math.max(
    0,
    newGens[genIndex].progress + updatedGen.delta,
  ); // prevent negative progress
  newGens[genIndex] = {...newGens[genIndex], progress: newProgress};

  return newGens;
};
