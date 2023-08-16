import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {global} from '../../styles';
import {Formik} from 'formik';
import {auth} from '../../firebase/config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useState} from 'react';
import {FormSchema} from './helpers';
import {StyledTextInput} from './elements';

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
    <View
      style={{
        ...global.screenWrapper,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        height: '100%',
      }}>
      <Formik
        initialValues={{email: '', password: ''}}
        onSubmit={values => handleLogin(values.email, values.password)}
        validationSchema={FormSchema}>
        {({handleChange, handleBlur, handleSubmit, values}) => (
          <View
            style={{
              height: '50%',
              width: '80%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: '#002266',
            }}>
            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 40, fontWeight: 'bold', color: 'white'}}>
                {'Login'}
              </Text>
            </View>
            <StyledTextInput
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <StyledTextInput
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <TouchableWithoutFeedback onPress={() => handleSubmit()}>
              <View
                style={{backgroundColor: 'white', padding: 20, width: '50%'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}>
                  {'Submit'}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        )}
      </Formik>
      {loginError && (
        <Text style={{color: 'red'}}> {`Error: ${loginError}`} </Text>
      )}
    </View>
  );
};
