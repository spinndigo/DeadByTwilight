import {User} from 'firebase/auth';
import {createContext} from 'react';

export const CurrentUserContext = createContext<User | undefined>(undefined);
