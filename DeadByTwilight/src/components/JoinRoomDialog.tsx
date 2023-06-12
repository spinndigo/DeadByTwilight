import {View} from 'react-native';
import React, {useState} from 'react';
import Dialog from 'react-native-dialog';

interface Props {
  onPress(): void;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

export const JoinRoomDialog: React.FC<Props> = ({onPress, show, setShow}) => {
  const [id, setId] = useState<string>('');
  return (
    <View>
      <Dialog.Container visible={show}>
        <Dialog.Title>{'Enter Room Id'}</Dialog.Title>
        <Dialog.Input onChangeText={value => setId(value)} />
        <Dialog.Button
          label="cancel"
          color={'red'}
          onPress={() => setShow(false)}
        />
        <Dialog.Button
          label="submit"
          disabled={!id}
          color={'blue'}
          onPress={() => onPress()}
        />
      </Dialog.Container>
    </View>
  );
};
