import {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {global} from '../styles';

export const StyledScreen: React.FC<PropsWithChildren> = ({children}) => (
  <View style={global.screenWrapper}> {children} </View>
);
