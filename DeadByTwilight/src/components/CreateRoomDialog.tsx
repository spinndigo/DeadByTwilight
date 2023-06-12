import {View} from 'react-native';
import React from 'react';
import Dialog from 'react-native-dialog';
import shortid from 'shortid';

interface Props {
  onPress(): void;
  show: boolean;
}

export const CreateRoomDialog: React.FC<Props> = ({show, onPress}) => {
  const id = shortid.generate();

  return (
    <View>
      <Dialog.Container visible={show}>
        <Dialog.Title>{'Share This ID With Your Friends'}</Dialog.Title>
        <Dialog.Description> {id} </Dialog.Description>
        <Dialog.Button label="ok" onPress={() => onPress()} />
      </Dialog.Container>
    </View>
  );
};
