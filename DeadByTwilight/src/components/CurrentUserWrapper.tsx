import React, {PropsWithChildren, useEffect, useState} from 'react';
import {CurrentUserContext} from '../CurrentUserContext';
import {auth} from '../firebase/config';
import {User} from 'firebase/auth';

export const CurrentUserWrapper: React.FC<PropsWithChildren> = ({children}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  console.log('rendering user wrapper');

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      console.log('running user change observer');
      setCurrentUser(user);
    });
  }, [auth.currentUser]);

  return (
    <CurrentUserContext.Provider value={{currentUser}}>
      {children}
    </CurrentUserContext.Provider>
  );
};
