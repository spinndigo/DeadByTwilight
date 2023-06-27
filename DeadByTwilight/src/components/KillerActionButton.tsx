import React, {useContext} from 'react';
import {Button} from 'react-native';
import {GameElement} from '../utils/types';
import {useGameChannel} from '../hooks';
import {GameDispatchContext} from '../GameContext';
import {Action} from '../gamestateReducer';
import {GEN_KICK_DAMAGE} from '../utils/constants';
import {isSurvivor} from '../utils/helpers';

interface Props {
  element: GameElement;
}

type ActionHandler = (id: string) => void;

export const KillerActionButton: React.FC<Props> = ({element}) => {
  const {gameChannel} = useGameChannel();
  const dispatch = useContext(GameDispatchContext);

  const elIsSurvivor = isSurvivor(element);

  if (!dispatch || !gameChannel) {
    console.warn('dispatch or channel not found..');
    return null;
  }

  const hitHandler: ActionHandler = async id => {
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: 'client-killer-hit',
      data: id,
    });
    dispatch({
      type: Action.UPDATE_SURVIVOR_HEALTH,
      payload: {survivor_id: id, healthChange: 'HURT'},
    });
  };

  const kickHandler: ActionHandler = async id => {
    await gameChannel?.trigger({
      channelName: gameChannel.channelName,
      eventName: 'client-killer-kick',
      data: id,
    });
    dispatch({
      type: Action.UPDATE_GEN_PROGRESS,
      payload: {id: id, delta: GEN_KICK_DAMAGE},
    });
  };
  const title = elIsSurvivor ? 'HIT' : 'KICK';
  const actionHandler = elIsSurvivor
    ? () => hitHandler(element.id)
    : () => kickHandler(element.id);

  return <Button title={title} onPress={actionHandler} />;
};
