import {View} from 'react-native';
import React from 'react';
import {GameState} from '../utils/types';
import {GameAction} from '../gamestateReducer';
import {PusherChannel} from '@pusher/pusher-websocket-react-native';

interface Props {
  game: GameState;
  channel: PusherChannel;
  dispatch: React.Dispatch<GameAction>;
}

export const Survivor: React.FC<Props> = ({game, channel, dispatch}) => {
  return <View>{'placeholder for survivor screen'}</View>;
};
