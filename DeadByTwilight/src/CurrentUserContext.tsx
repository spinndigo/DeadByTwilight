import {User} from 'firebase/auth';
import {createContext} from 'react';

interface UserContextValue {
  currentUser: User | null;
}

export const CurrentUserContext = createContext<UserContextValue>({
  currentUser: null,
});
