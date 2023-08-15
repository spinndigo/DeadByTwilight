import {Button, Text, TextInput, View} from 'react-native';
import {global} from '../../styles';
import {Formik} from 'formik';
import {auth} from '../../firebase/config';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {useState} from 'react';
import {FormSchema} from './helpers';

export const RegisterScreen: React.FC<{}> = () => {
  const [registerError, setRegisterError] = useState('');
  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(`logged in as ${userCredential.user.email}`);
      })
      .catch(error => {
        setRegisterError(error.message);
      });
  };

  return (
    <View style={{...global.screenWrapper, justifyContent: 'center'}}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => handleRegister(values.email, values.password)}
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
      {registerError && (
        <Text style={{color: 'red'}}> {`Error: ${registerError}`} </Text>
      )}
    </View>
  );
};
