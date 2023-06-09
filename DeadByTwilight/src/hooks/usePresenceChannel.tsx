import {
  PusherChannel,
  PusherMember,
} from '@pusher/pusher-websocket-react-native';
import {useContext, useEffect, useState} from 'react';
import {PusherContext} from '../components';

export const usePresenceChannel = (id: string) => {
  const [presenceChannel, setPresenceChannel] = useState<PusherChannel | null>(
    null,
  );
  const [channelMembers, setChannelMembers] = useState<Array<PusherMember>>([]);
  const [me, setMe] = useState<PusherMember | undefined>(undefined);
  const pusher = useContext(PusherContext);
  useEffect(() => {
    const connectPresenceChannel = async () => {
      if (pusher) {
        const subbedChannel = await pusher?.subscribe({
          channelName: `presence-${id}`,
          onMemberAdded: m =>
            setChannelMembers(prev => {
              const newMembers = prev.slice();
              newMembers.push(m);
              return newMembers;
            }),
          onMemberRemoved: m => console.log(`removed: ${m.toString}`),
          onSubscriptionError(channelName, message, _e) {
            console.log(`${channelName} had the following error: ${message}`);
          },
          onSubscriptionSucceeded: _data => {
            setMe(subbedChannel.me);
            setChannelMembers(_prev => {
              const newMembers = Array.from(subbedChannel.members.values());
              return newMembers;
            });
          },
          onEvent(event) {
            switch (event.eventName) {
              case 'Survivor Selected':
                console.log('todo');
                break;

              default:
                console.warn('received unexpected event');
            }
          },
        });
        setPresenceChannel(subbedChannel);
      }
    };
    connectPresenceChannel();
  }, [id, pusher]);

  return {
    presenceChannel,
    channelMembers,
    me,
    playerCount: channelMembers.length,
  };
};
