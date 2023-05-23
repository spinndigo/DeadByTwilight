import {Pusher} from '@pusher/pusher-websocket-react-native';
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';

const pusher = Pusher.getInstance();
export const PusherContext = createContext<Pusher | null>(null);
export const PusherWrapper: React.FC<PropsWithChildren> = ({children}) => {
  const [pusherInstance, setPusherInstance] = useState<Pusher | null>(null);
  useEffect(() => {
    async function initPusher() {
      await pusher.init({
        apiKey: 'b16adf11ba39c8f28218',
        cluster: 'mt1',
        authEndpoint: 'http://localhost:5001/pusher/auth',
      });
      await pusher.connect();
      setPusherInstance(pusher);
    }
    initPusher();
  }, []);

  return (
    <PusherContext.Provider value={pusherInstance}>
      {children}
    </PusherContext.Provider>
  );
};
