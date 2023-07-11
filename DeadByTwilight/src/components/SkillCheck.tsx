import React from 'react';
import {View} from 'react-native';
import {SegmentedCircle} from '../assests/SegmentedCircle';

export interface CheckProps {
  onGood(): void;
  onGreat(): void;
  onMiss(): void;
}

// assume repair/heal button is held if this is rendering
export const SkillCheck: React.FC<CheckProps> = props => {
  return (
    <View>
      <SegmentedCircle {...props} />
    </View>
  );
};
