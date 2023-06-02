import Slider from '@react-native-community/slider';
import React from 'react';

interface Props {
  onValueChange(value: number): void;
  initialCount: number;
}

export const GenCountSlider: React.FC<Props> = ({
  initialCount,
  onValueChange,
}) => {
  return (
    <Slider
      onValueChange={value => onValueChange(value)}
      value={initialCount}
      step={1}
      style={{width: 200, height: 40}}
      minimumValue={1}
      maximumValue={5}
      minimumTrackTintColor="blue"
      maximumTrackTintColor="red"
    />
  );
};
