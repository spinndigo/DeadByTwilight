import {View} from 'react-native';
import {styled} from 'styled-components';

export const GameItemWrapper = styled(View)`
  border-color: black;
  border-width: 2px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const SurvivorItemWrapper = styled(GameItemWrapper)`
  border-width: 0px;
`;
