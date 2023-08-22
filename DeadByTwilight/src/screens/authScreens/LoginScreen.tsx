import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {global} from '../../styles';
import {ErrorMessage, Formik} from 'formik';
import {auth} from '../../firebase/config';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useContext, useEffect, useState} from 'react';
import {loginSchema} from './helpers';
import {ErrorLabel, StyledTextInput} from './elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigators';
import {CurrentUserContext} from '../../CurrentUserContext';

export const LoginScreen: React.FC<
  NativeStackScreenProps<AuthStackParamList, 'Login'>
> = ({navigation}) => {
  const {navigate} = navigation;
  const {currentUser} = useContext(CurrentUserContext);
  const [loginError, setLoginError] = useState('');
  const handleLogin = async (email: string, password: string) => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
        console.log(`logged in as ${userCredential.user.email}`);
      })
      .catch(error => {
        setLoginError(error);
      });
  };

  useEffect(() => {
    if (currentUser) navigate('GameStack');
  }, [currentUser]);

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
        validationSchema={loginSchema}>
        {({
          isSubmitting,
          isValid,
          handleChange,
          handleBlur,
          handleSubmit,
          values,
        }) => (
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
              textContentType="emailAddress"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Email"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <ErrorLabel>
              <ErrorMessage name="email" />
            </ErrorLabel>
            <StyledTextInput
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <ErrorLabel>
              <ErrorMessage name="password" />
            </ErrorLabel>
            <TouchableWithoutFeedback
              disabled={isSubmitting || !isValid}
              onPress={() => handleSubmit()}>
              <View
                style={{backgroundColor: 'white', padding: 20, width: '50%'}}>
                <Text
                  style={{
                    color: isSubmitting || !isValid ? 'grey' : 'black',
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
      <View style={{marginTop: 20}}>
        <Text style={{color: 'white'}}>
          {"Don't have an account? "}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Register')}>
            <Text style={{color: 'orange'}}>{'Click Here'}</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
      {loginError && (
        <Text style={{color: 'red'}}> {`Error: ${loginError}`} </Text>
      )}
    </View>
  );
};
