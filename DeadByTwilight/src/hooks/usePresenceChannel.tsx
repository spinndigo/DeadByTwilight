import {Pusher, PusherChannel} from '@pusher/pusher-websocket-react-native';
import {useEffect, useState} from 'react';

export const usePresenceChannel = (id: string) => {
  const [presenceChannel, setPresenceChannel] = useState<PusherChannel | null>(
    null,
  );
  useEffect(() => {
    const connectPresenceChannel = async () => {
      const subbedChannel = await Pusher.getInstance().subscribe({
        channelName: `presence-${id}`,
        onMemberAdded: m => console.log(m.toString),
        onMemberRemoved: m => console.log(`removed: ${m.toString}`),
      });
      setPresenceChannel(subbedChannel);
    };
    connectPresenceChannel();
  }, [id]);

  return {presenceChannel};
};
