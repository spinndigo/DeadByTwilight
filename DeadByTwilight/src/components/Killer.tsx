import {View} from 'react-native';
import React from 'react';
import {PusherChannel} from '@pusher/pusher-websocket-react-native';
import {GameAction} from '../gamestateReducer';
import {GameState} from '../utils/types';

interface Props {
  game: GameState;
  channel: PusherChannel;
  dispatch: React.Dispatch<GameAction>;
}

export const Killer: React.FC<Props> = () => {
  return <View>{'placeholder for killer screen'}</View>;
};
