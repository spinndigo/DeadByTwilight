import React from 'react';
import {View} from 'react-native';
import {SegmentedCircle} from '../assests/SegmentedCircle';

interface Props {
  onGood(): void;
  onGreat(): void;
  onMiss(): void;
}

export const SkillCheck: React.FC<Props> = () => {
  return (
    <View>
      <SegmentedCircle />
    </View>
  );
};
