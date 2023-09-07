import {View} from 'react-native';
import React from 'react';
import Dialog from 'react-native-dialog';
import {useCurrentUser} from '../hooks';
import {deleteUser} from 'firebase/auth';

interface Props {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DeleteAccountDialog: React.FC<Props> = ({show, setShow}) => {
  const {currentUser} = useCurrentUser();
  const deleteAccount = async () => {
    if (currentUser) await deleteUser(currentUser);
    setShow(false);
  };
  return (
    <View>
      <Dialog.Container visible={show}>
        <Dialog.Title>
          {`${currentUser?.displayName}, are you sure you want to delete your account?`}
        </Dialog.Title>
        <Dialog.Button
          label="Cancel"
          color={'black'}
          onPress={() => setShow(false)}
        />
        <Dialog.Button
          label="Delete Account"
          color={'red'}
          onPress={() => deleteAccount()}
        />
      </Dialog.Container>
    </View>
  );
};
