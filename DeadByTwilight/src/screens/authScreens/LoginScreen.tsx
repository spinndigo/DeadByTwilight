import {Button, Text, TextInput, View} from 'react-native';
import {global} from '../../styles';
import {Formik} from 'formik';
import {auth} from '../../firebase/config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useState} from 'react';
import {FormSchema} from './helpers';

export const LoginScreen: React.FC<{}> = () => {
  const [loginError, setLoginError] = useState('');
  const handleLogin = (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        // Signed in
        console.log(`logged in as ${userCredential.user.email}`);
        // ...
      })
      .catch(error => {
        setLoginError(error);
      });
  };

  return (
    <View style={{...global.screenWrapper, justifyContent: 'center'}}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => handleLogin(values.email, values.password)}
        validationSchema={FormSchema}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View>
            <TextInput
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <TextInput
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Button onPress={() => handleSubmit()} title="Submit" />
          </View>
        )}
      </Formik>
      {loginError && (
        <Text style={{color: 'red'}}> {`Error: ${loginError}`} </Text>
      )}
    </View>
  );
};
