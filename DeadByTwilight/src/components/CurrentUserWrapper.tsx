import React, {PropsWithChildren, useEffect, useState} from 'react';
import {CurrentUserContext} from '../CurrentUserContext';
import {auth} from '../firebase/config';
import {User} from 'firebase/auth';

export const CurrentUserWrapper: React.FC<PropsWithChildren> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  console.log('rendering user wrapper');

  auth.onAuthStateChanged(user => {
    console.log('running user change observer');
    if (user) {
      setCurrentUser(user);
    } else {
      setCurrentUser(undefined);
    }
  });

  return (
    <CurrentUserContext.Provider value={{currentUser}}>
      {children}
    </CurrentUserContext.Provider>
  );
};
