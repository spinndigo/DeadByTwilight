import React from 'react';
import {User} from 'firebase/auth';
import {createContext} from 'react';

interface UserContextValues {
  currentUser: User | undefined;
  setCurrentUser:
    | React.Dispatch<React.SetStateAction<User | undefined>>
    | undefined;
}

export const CurrentUserContext = createContext<UserContextValues>({
  currentUser: undefined,
  setCurrentUser: undefined,
});
