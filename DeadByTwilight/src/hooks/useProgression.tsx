/* eslint-disable curly */
import {GameDispatchContext} from '../GameContext';
import {Action} from '../gamestateReducer';
import {getProgressionRate, isSurvivor} from '../utils/helpers';
import {GameElement} from '../utils/types';
import {useContext, useEffect} from 'react';
import {useGameChannel} from './useGameChannel';

export const useProgression = (element: GameElement, isHeld: boolean) => {
  const rate = getProgressionRate(element);
  const elIsSurvivor = isSurvivor(element);
  const action = elIsSurvivor
    ? Action.UPDATE_SURVIVOR_PROGRESS
    : Action.UPDATE_GEN_PROGRESS;
  const dispatch = useContext(GameDispatchContext);
  const {gameChannel} = useGameChannel();

  useEffect(() => {
    const onHold = async () => {
      if (!dispatch || !gameChannel) {
        console.warn('state dispatcher or game channel not found');
        return;
      }

      if (!isHeld) return; // do nothing if not held

      await gameChannel?.trigger({
        channelName: gameChannel.channelName,
        eventName: `client-${elIsSurvivor ? 'survivor' : 'gen'}-progressed`,
        data: JSON.stringify({
          id: element.id,
          delta: rate,
        }),
      });
      dispatch({
        type: action,
        payload: {id: element.id, delta: rate},
      });
    };
    const timer = setInterval(onHold, 1000);
    return () => clearInterval(timer);
  }, [action, dispatch, elIsSurvivor, element.id, gameChannel, isHeld, rate]);
};
