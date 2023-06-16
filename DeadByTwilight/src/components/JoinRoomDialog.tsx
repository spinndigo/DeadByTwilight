import {View} from 'react-native';
import React, {useState} from 'react';
import Dialog from 'react-native-dialog';

interface Props {
  onPress(id: string): void;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
  show: boolean;
}

export const JoinRoomDialog: React.FC<Props> = ({onPress, show, setShow}) => {
  const [id, setId] = useState<string>('');
  return (
    <View>
      <Dialog.Container visible={show}>
        <Dialog.Title>{'Enter Room Id'}</Dialog.Title>
        <Dialog.Input
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          onChangeText={value => setId(value)}
        />
        <Dialog.Button
          label="cancel"
          color={'red'}
          onPress={() => setShow(false)}
        />
        <Dialog.Button
          label="submit"
          disabled={!id}
          color={'blue'}
          onPress={() => onPress(id)}
        />
      </Dialog.Container>
    </View>
  );
};
