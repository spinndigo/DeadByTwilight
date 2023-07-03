/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  Modal,
  ModalBaseProps,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {GameElement} from '../utils/types';
import {useGameChannel} from '../hooks';
import {GameContext} from '../GameContext';
import {getInvalidInteractionMessage} from '../utils/helpers';

export type ElementInteraction = {label: string; onPress(): void};

interface Props {
  gameElement: GameElement | undefined;
  onPressX(): void;
  action: React.ReactNode;
}

export const ActionModal: React.FC<Props & ModalBaseProps> = ({
  gameElement,
  onPressX,
  action,
  ...modalProps
}) => {
  const {gameChannel} = useGameChannel();
  const game = useContext(GameContext);

  if (!gameElement || !game || !gameChannel) {
    return <></>;
  }
  const player =
    game.killer?.id === gameChannel.me?.userId
      ? game.killer
      : game.survivors.find(s => s.id === gameChannel.me?.userId);

  if (!player) {
    return <></>;
  }

  const invalidMessage = getInvalidInteractionMessage(player, gameElement);

  return (
    <Modal
      animationType="fade"
      supportedOrientations={['landscape']}
      {...modalProps}>
      <View
        style={{
          height: '100%',
          width: '100%',
          justifyContent: 'center',
          alignContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            height: '80%',
            width: '80%',
            padding: 10,
            flexDirection: 'column',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center',
          }}>
          {invalidMessage ? (
            <Text>{invalidMessage}</Text>
          ) : (
            <View>{action}</View>
          )}
          <View
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              width: '100%',
              marginTop: 'auto',
            }}>
            <TouchableWithoutFeedback
              style={{
                borderRadius: 50,
                height: 60,
                width: 60,
                backgroundColor: 'purple',
              }}
              onPress={onPressX}>
              <Text style={{color: 'green', fontSize: 35, textAlign: 'center'}}>
                {'X'}
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    </Modal>
  );
};
