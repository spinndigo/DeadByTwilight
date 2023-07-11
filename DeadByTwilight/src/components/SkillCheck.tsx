import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {SegmentedCircle} from '../assests/SegmentedCircle';
import {getRandomInt} from '../utils/helpers';

export interface CheckProps {
  onGood(): void;
  onGreat(): void;
  onMiss(): void;
}

// assume repair/heal button is held if this is rendering

const hitOffset = getRandomInt(0, 360);
export const SkillCheck: React.FC<CheckProps> = props => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setShow(s => !s);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!show) return null;

  return (
    <View>
      <SegmentedCircle hitOffset={hitOffset} {...props} />
    </View>
  );
};
