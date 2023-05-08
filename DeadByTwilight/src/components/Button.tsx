import React from 'react';
import {ButtonProps, Button as RNButton} from 'react-native';

export const Button: React.FC<ButtonProps> = props => <RNButton {...props} />;
