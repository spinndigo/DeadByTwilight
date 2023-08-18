import {styled} from 'styled-components';
import {Text, TextInput} from 'react-native';

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
