/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Gen, Survivor} from '../utils/types';

import {Button, Modal, ModalBaseProps, View} from 'react-native';
import {SurvivorItem} from './SurvivorItem';
import {GenItem} from './GenItem';

type GameElement = Survivor | Gen;

interface Props {
  modalProps: ModalBaseProps;
  gameElement: GameElement;
  buttonLabel: string;
  onPress(): void;
}

function isSurvivor(element: GameElement): element is Survivor {
  return (element as Survivor).health !== undefined;
}

export const ActionModal: React.FC<Props> = ({
  modalProps,
  gameElement,
  buttonLabel,
  onPress,
}) => {
  const elementIsSurvivor = isSurvivor(gameElement);

  return (
    <Modal {...modalProps}>
      <View style={{height: '100%', width: '100%', flexDirection: 'row'}}>
        <View
          style={{
            width: '50%',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          {elementIsSurvivor ? (
            <SurvivorItem survivor={gameElement} onPress={() => undefined} />
          ) : (
            <GenItem gen={gameElement} onPress={() => undefined} />
          )}
        </View>
        <View
          style={{
            width: '50%',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <Button title={buttonLabel} onPress={onPress} />
        </View>
      </View>
    </Modal>
  );
};
