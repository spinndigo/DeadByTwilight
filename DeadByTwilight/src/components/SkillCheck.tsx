import React from 'react';
import GradiantCircle from '../assests/GradiantCircle';
import {View} from 'react-native';

interface Props {
  onGood(): void;
  onGreat(): void;
  onMiss(): void;
}

export const SkillCheck: React.FC<Props> = () => {
  const hitZone = 0;

  return (
    <View>
      <GradiantCircle height={'90%'} width={'90%'} hitZone={hitZone} />
    </View>
  );
};
