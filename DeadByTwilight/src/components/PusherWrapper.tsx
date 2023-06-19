import {Pusher} from '@pusher/pusher-websocket-react-native';
import React, {
  PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react';

const AUTH_ENDPOINT = 'https://dead-by-twilight-express-server.onrender.com';

const pusher = Pusher.getInstance();
export const PusherContext = createContext<Pusher | null>(null);
export const PusherWrapper: React.FC<PropsWithChildren> = ({children}) => {
  const [pusherInstance, setPusherInstance] = useState<Pusher | null>(null);
  useEffect(() => {
    async function initPusher() {
      await pusher.init({
        apiKey: 'b16adf11ba39c8f28218',
        cluster: 'mt1',
        authEndpoint: `${AUTH_ENDPOINT}/pusher/auth`,

        onConnectionStateChange(currentState, previousState) {
          console.log(
            `old connection state: ${previousState} \n new connection state: ${currentState}`,
          );
        },
        onSubscriptionSucceeded(channelName, data) {
          console.log(
            `channel connection: ${channelName} with data ${JSON.stringify(
              data,
            )} `,
          );
        },
        onSubscriptionError(channelName, message, _e) {
          console.log(`${channelName} had this error : ${message}`);
        },
      });
      await pusher.connect();
      setPusherInstance(pusher);
    }
    try {
      initPusher();
    } catch (e) {
      console.log('error: ', e);
    }
  }, []);

  return (
    <PusherContext.Provider value={pusherInstance}>
      {children}
    </PusherContext.Provider>
  );
};
