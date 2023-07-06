import React from 'react';
import {Circle} from './elements';
import GradiantCircle from '../assests/GradiantCircle';

interface Props {
  onGood(): void;
  onGreat(): void;
  onMiss(): void;
}

export const SkillCheck: React.FC<Props> = ({onGood, onGreat, onMiss}) => {
  return <GradiantCircle />;
};
