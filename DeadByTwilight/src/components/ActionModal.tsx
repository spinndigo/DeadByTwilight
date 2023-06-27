/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Modal, ModalBaseProps, View} from 'react-native';
import {SurvivorItem} from './SurvivorItem';
import {GenItem} from './GenItem';
import {GameElement} from '../utils/types';
import {isSurvivor} from '../utils/helpers';

export type ElementInteraction = {label: string; onPress(): void};

interface Props {
  gameElement: GameElement | undefined;
  action: React.ReactNode;
}

export const ActionModal: React.FC<Props & ModalBaseProps> = ({
  gameElement,
  action,
  ...modalProps
}) => {
  if (!gameElement) {
    return <></>;
  }
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
          {action}
        </View>
      </View>
    </Modal>
  );
};
