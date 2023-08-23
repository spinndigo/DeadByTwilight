import {ErrorMessage, Formik} from 'formik';
import {useState} from 'react';
import {View} from 'react-native';
import Dialog from 'react-native-dialog';
import {auth} from '../firebase/config';
import {sendPasswordResetEmail} from 'firebase/auth';

interface Props {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ForgotPasswordModal: React.FC<Props> = ({
  isVisible,
  setIsVisible,
  ...rest
}) => {
  const [email, setEmail] = useState('');

  const resetEmail = async (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('success');
        setIsVisible(false);
      })
      .catch(error => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <View>
      <Dialog.Container visible={isVisible} onRequestClose={() => undefined}>
        <Dialog.Title>{'Enter Email'}</Dialog.Title>
        <Dialog.Input
          placeholder="youremail@example.com"
          textContentType="emailAddress"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          spellCheck={false}
          onChangeText={value => setEmail(value)}
        />
        <Dialog.Button
          label="cancel"
          color={'red'}
          onPress={() => setIsVisible(false)}
        />
        <Dialog.Button
          label="submit"
          disabled={false}
          color={'blue'}
          onPress={() => resetEmail(email)}
        />
      </Dialog.Container>
    </View>
  );
};
