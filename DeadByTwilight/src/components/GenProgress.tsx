import * as Progress from 'react-native-progress';
import React from 'react';
import {View} from 'react-native';
export const GenProgress: React.FC<{progress: number}> = ({progress}) => {
  return (
    <View>
      <Progress.Bar progress={progress} />
    </View>
  );
};
