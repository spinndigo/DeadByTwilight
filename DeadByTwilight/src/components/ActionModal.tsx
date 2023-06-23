/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Button, Modal, ModalBaseProps, View} from 'react-native';
import {SurvivorItem} from './SurvivorItem';
import {GenItem} from './GenItem';
import {GameElement} from '../utils/types';
import {isSurvivor} from '../utils/helpers';

export type ElementInteraction = {label: string; onPress(): void};

interface Props {
  gameElement: GameElement | undefined;
  interaction: ElementInteraction;
}

export const ActionModal: React.FC<Props & ModalBaseProps> = ({
  gameElement,
  interaction,
  ...modalProps
}) => {
  if (!gameElement) {
    return <></>;
  } // should not happen
  const elementIsSurvivor = isSurvivor(gameElement);
  const {label, onPress} = interaction;

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
          <Button title={label} onPress={onPress} />
        </View>
      </View>
    </Modal>
  );
};
