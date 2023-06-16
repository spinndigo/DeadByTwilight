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
          onSubscriptionSucceeded: _data => {
            console.log('subscription success: ', _data);
          },
          onEvent(event) {
            switch (event.eventName) {
              case 'client-survivor-selected':
                dispatch({type: Action.ADD_SURVIVOR, payload: event.data});
                console.log('received survivor selected: ', event.data);
                break;
              case 'client-killer-selected':
                dispatch({type: Action.ADD_KILLER, payload: event.data});
                break;
              case 'client-survivor-removed':
                dispatch({type: Action.REMOVE_SURVIVOR, payload: event.data});
                break;
              case 'client-killer-removed':
                dispatch({type: Action.REMOVE_KILLER, payload: event.data});
                break;
              case 'client-set-initial-gens':
                console.log(
                  `channel received client set initial gens: ${event} `,
                );
                dispatch({
                  type: Action.SET_INITIAL_GENS,
                  payload: {quantity: event.data},
                });
                break;
              default:
                console.warn('received unexpected event: ', event.eventName);
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
