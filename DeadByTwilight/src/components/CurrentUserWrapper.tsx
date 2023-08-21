import React, {PropsWithChildren, useEffect, useState} from 'react';
import {CurrentUserContext} from '../CurrentUserContext';
import {auth} from '../firebase/config';
import {User} from 'firebase/auth';

export const CurrentUserWrapper: React.FC<PropsWithChildren> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(undefined);
      }
    });
  }, []);

  return (
    <CurrentUserContext.Provider value={{currentUser, setCurrentUser}}>
      {children}
    </CurrentUserContext.Provider>
  );
};