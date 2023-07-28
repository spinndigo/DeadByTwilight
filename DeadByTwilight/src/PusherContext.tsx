import {Pusher} from '@pusher/pusher-websocket-react-native';
import {createContext} from 'react';

export const PusherContext = createContext<Pusher | null>(null);
