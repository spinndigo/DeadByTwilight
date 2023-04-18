import React, {PropsWithChildren} from 'react';
import {Button as RNButton} from 'react-native';

interface ButtonProps extends PropsWithChildren {
  title: string;
}

export const Button: React.FC<ButtonProps> = props => (
  <RNButton {...props}>{props.children}</RNButton>
);
