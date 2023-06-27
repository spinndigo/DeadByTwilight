/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Modal,
  ModalBaseProps,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SurvivorItem} from './SurvivorItem';
import {GenItem} from './GenItem';
import {GameElement} from '../utils/types';
import {isSurvivor} from '../utils/helpers';

export type ElementInteraction = {label: string; onPress(): void};

interface Props {
  gameElement: GameElement | undefined;
  onDismiss(): void;
  action: React.ReactNode;
}

export const ActionModal: React.FC<Props & ModalBaseProps> = ({
  gameElement,
  onDismiss,
  action,
  ...modalProps
}) => {
  if (!gameElement) {
    return <></>;
  }
  const elementIsSurvivor = isSurvivor(gameElement);

  return (
    <Modal
      animationType="fade"
      supportedOrientations={['landscape']}
      style={{height: '90%', width: '90%'}}
      {...modalProps}>
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
            justifyContent: 'center',
            alignContent: 'center',
            borderRadius: 50,
            height: 60,
            width: 60,
            backgroundColor: 'purple',
            position: 'absolute',
            top: '80%',
            left: '46%',
          }}>
          <TouchableWithoutFeedback onPress={onDismiss}>
            <Text style={{color: 'white', fontSize: 35, textAlign: 'center'}}>
              {'X'}
            </Text>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={{
            width: '50%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          <View>{action}</View>
        </View>
      </View>
    </Modal>
  );
};
