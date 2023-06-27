import * as Progress from 'react-native-progress';
import React from 'react';
import {View} from 'react-native';
import {GameElement} from '../utils/types';

interface Props {
  element: GameElement;
}

export const HeldProgressBar: React.FC<Props> = ({element}) => {
  return (
    <View>
      <Progress.Bar progress={element.progress * 0.01} />
    </View>
  );
};
