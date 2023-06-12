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
  const pusher = useContext(PusherContext);
  useEffect(() => {
    const connectPresenceChannel = async () => {
      if (pusher && id) {
        const subbedChannel = await pusher?.subscribe({
          channelName: `presence-${id}`,
          onMemberRemoved: m => console.log(`removed: ${m.toString}`),
          onSubscriptionError(channelName, message, _e) {
            console.log(`${channelName} had the following error: ${message}`);
          },
          onSubscriptionSucceeded: _data => {
            console.log('subscription success: ', _data);
          },
          onEvent(event) {
            switch (event.eventName) {
              case 'Survivor Selected':
                console.log('todo');
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
  }, [id, pusher, setGameChannel]);

  return {
    gameChannel,
    setGameChannel,
  };
};
