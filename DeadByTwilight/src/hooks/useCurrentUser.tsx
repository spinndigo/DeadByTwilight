import {useContext} from 'react';
import {CurrentUserContext} from '../CurrentUserContext';

export const useCurrentUser = () => {
  const currentUser = useContext(CurrentUserContext);
  const isLoggedIn = currentUser ? true : false;
  return {currentUser, isLoggedIn};
};
