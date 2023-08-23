import {Text, TextInput, View} from 'react-native';
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

export const RowWrapper = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-content: center;
  width: 100%;
`;

export const ColumnWrapper = styled(View)`
  justify-content: center;
  align-content: center;
  height: 100%;
`;

interface CircleProps {
  size: number;
}

export const Circle = styled(View)<CircleProps>`
  height: ${(props: CircleProps) => `${props.size}px`};
  width: ${(props: CircleProps) => `${props.size}px`};
  border-radius: ${(props: CircleProps) => `${props.size * 0.5}px`};
  border: 3px;
`;

export const StyledTextInput = styled(TextInput)`
  padding: 10px;
  background-color: white;
  margin: 10px;
  color: black;
  height: 50px;
  width: 80%;
  border-width: 2px;
  margin-bottom: 40px;
`;

export const StyledRegisterInput = styled(StyledTextInput)`
  margin-bottom: 20px;
`;

export const ErrorLabel = styled(Text)`
  color: red;
`;
