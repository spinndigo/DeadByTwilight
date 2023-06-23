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
import {PusherContext} from '../components';
import {GameDispatchContext} from '../GameContext';
import {Action} from '../gamestateReducer';
import {GEN_KICK_DAMAGE} from '../utils/constants';

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

export const useGameChannel = (id?: string) => {
  const [gameChannel, setGameChannel] = useContext(GameChannelContext);
  const dispatch = useContext(GameDispatchContext);
  const pusher = useContext(PusherContext);
  useEffect(() => {
    const connectPresenceChannel = async () => {
      if (!dispatch) return new Error('dispatch not initialized');
      if (pusher && id) {
        const subbedChannel = await pusher?.subscribe({
          channelName: `presence-${id}`,
          onMemberAdded(member) {
            console.log('member added to channel: ', member);
          },
          onMemberRemoved: m => {
            console.log('running member removed: ', m);
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
                console.log('received survivor selected: ', event.data);
                break;
              case 'client-killer-selected':
                console.log('received killer selected: ', event.data);
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
                console.log(
                  `channel received client set initial gens: ${event.data} `,
                );
                console.log(`parsed json: ${JSON.parse(event.data)}`);
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
                  type: Action.UPDATE_PROGRESS,
                  payload: {gen_id: id, delta: GEN_KICK_DAMAGE},
                });
                break;
              default:
                console.warn(
                  `received unexpected event: ${event.eventName} from ${event.channelName} with ${event.data} ,  `,
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
  }, [dispatch, id, pusher, setGameChannel]);

  return {
    gameChannel,
    setGameChannel,
  };
};
