import {User} from 'firebase/auth';
import {createContext} from 'react';

interface UserContextValue {
  currentUser: User | undefined;
}

export const CurrentUserContext = createContext<UserContextValue>({
  currentUser: undefined,
});
