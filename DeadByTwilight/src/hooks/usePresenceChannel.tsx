import {PusherChannel} from '@pusher/pusher-websocket-react-native';
import {useContext, useEffect, useState} from 'react';
import {PusherContext} from '../components';

export const usePresenceChannel = (id: string) => {
  const [presenceChannel, setPresenceChannel] = useState<PusherChannel | null>(
    null,
  );
  const pusher = useContext(PusherContext);
  useEffect(() => {
    const connectPresenceChannel = async () => {
      if (pusher) {
        const subbedChannel = await pusher?.subscribe({
          channelName: `presence-${id}`,
          onMemberAdded: m => console.log(m.toString),
          onMemberRemoved: m => console.log(`removed: ${m.toString}`),
        });
        setPresenceChannel(subbedChannel);
      }
    };
    connectPresenceChannel();
  }, [id, pusher]);

  return {presenceChannel};
};
