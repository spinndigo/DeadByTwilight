/* eslint-disable curly */
import {PusherChannel} from '@pusher/pusher-websocket-react-native';
import React, {
  Dispatch,
  PropsWithChildren,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import {GameDispatchContext} from '../GameContext';
import {Action} from '../gamestateReducer';
import {GEN_KICK_DAMAGE} from '../utils/constants';
import {PusherContext} from '../PusherContext';

type ChannelContextValue = [
  PusherChannel | null,
  Dispatch<SetStateAction<PusherChannel | null>> | null,
];

const GameChannelContext = createContext<ChannelContextValue>([null, null]);
export const GameChannelProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const value = useState<PusherChannel | null>(null);
  return <GameChannelContext.Provider value={value} children={children} />;
};

export const useGameChannel = (channelId?: string) => {
  const [gameChannel, setGameChannel] = useContext(GameChannelContext);
  const dispatch = useContext(GameDispatchContext);
  const pusher = useContext(PusherContext);
  useEffect(() => {
    const connectPresenceChannel = async () => {
      if (!dispatch) return new Error('dispatch not initialized');
      if (pusher && channelId) {
        const subbedChannel = await pusher?.subscribe({
          channelName: `presence-${channelId}`,
          onMemberAdded(member) {
            console.log('member added to channel: ', member);
          },
          onMemberRemoved: m => {
            dispatch({type: Action.REMOVE_SURVIVOR, payload: {id: m.userId}});
            dispatch({type: Action.REMOVE_KILLER, payload: {id: m.userId}});
          },
          onSubscriptionError(channelName, message, _e) {
            console.log(`${channelName} had the following error: ${message}`);
          },
          onSubscriptionSucceeded: data => {
            console.log('channel subscription success: ', data);
          },
          onEvent(event) {
            console.log('received event: ', event);
            switch (event.eventName) {
              case 'client-survivor-selected':
                dispatch({
                  type: Action.ADD_SURVIVOR,
                  payload: JSON.parse(event.data),
                });

                break;
              case 'client-killer-selected':
                dispatch({
                  type: Action.ADD_KILLER,
                  payload: JSON.parse(event.data),
                });
                break;
              case 'client-survivor-removed':
                dispatch({
                  type: Action.REMOVE_SURVIVOR,
                  payload: JSON.parse(event.data),
                });
                break;
              case 'client-killer-removed':
                dispatch({
                  type: Action.REMOVE_KILLER,
                  payload: JSON.parse(event.data),
                });
                break;
              case 'client-set-initial-gens':
                dispatch({
                  type: Action.SET_INITIAL_GENS,
                  payload: JSON.parse(event.data),
                });
                break;
              case 'client-update-game-status':
                dispatch({
                  type: Action.UPDATE_GAME_STATUS,
                  payload: event.data,
                });
                break;
              case 'client-killer-hit':
                dispatch({
                  type: Action.UPDATE_SURVIVOR_HEALTH,
                  payload: {survivor_id: event.data, healthChange: 'HURT'},
                });
                break;
              case 'client-killer-kick':
                dispatch({
                  type: Action.UPDATE_GEN_PROGRESS,
                  payload: {id: event.data, delta: GEN_KICK_DAMAGE},
                });
                break;
              case 'client-survivor-progressed':
                dispatch({
                  type: Action.UPDATE_SURVIVOR_PROGRESS,
                  payload: JSON.parse(event.data),
                });
                break;
              case 'client-gen-progressed':
                dispatch({
                  type: Action.UPDATE_GEN_PROGRESS,
                  payload: JSON.parse(event.data),
                });
                break;

              case 'client-survivor-ongoing-updated':
                dispatch({
                  type: Action.UPDATE_SURVIVOR_ONGOING_ACTION,
                  payload: JSON.parse(event.data),
                });
                break;

              case 'client-reset-game':
                dispatch({
                  type: Action.RESET_GAME,
                });

              default:
                console.warn(
                  `received unexpected event: ${event.eventName} from ${event.channelName} with ${event.data}`,
                );
            }
          },
        });
        if (setGameChannel) {
          setGameChannel(subbedChannel);
        }
      }
    };
    connectPresenceChannel();
  }, [dispatch, channelId, pusher, setGameChannel]);

  return {
    gameChannel,
    setGameChannel,
  };
};
