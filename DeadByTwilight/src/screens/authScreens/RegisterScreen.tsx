import {Text, TouchableWithoutFeedback, View} from 'react-native';
import {global} from '../../styles';
import {ErrorMessage, Formik} from 'formik';
import {auth} from '../../firebase/config';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from 'firebase/auth';
import {useContext, useEffect, useState} from 'react';
import {registerSchema} from './helpers';
import {ErrorLabel, StyledRegisterInput, StyledTextInput} from './elements';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigators';
import {CurrentUserContext} from '../../CurrentUserContext';

export const RegisterScreen: React.FC<
  NativeStackScreenProps<AuthStackParamList, 'Register'>
> = ({navigation}) => {
  const {navigate} = navigation;
  const {currentUser, setCurrentUser} = useContext(CurrentUserContext);
  const [RegisterError, setRegisterError] = useState('');
  const handleRegister = (email: string, password: string) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        // Signed in
        const user = userCredential.user;
        await sendEmailVerification(user);
        console.log('verification email sent');
      })
      .catch(error => {
        const errorMessage = error.message;
        setRegisterError(errorMessage);
        console.log(errorMessage);
      });
  };

  useEffect(() => {
    if (currentUser) navigate('GameStack');
  }, [currentUser]);

  useEffect(() => {
    if (auth.currentUser && auth.currentUser.emailVerified) {
      if (!currentUser && setCurrentUser) setCurrentUser(auth.currentUser);
    }
  }, [auth.currentUser, auth.currentUser?.email]);

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
        initialValues={{email: '', password: '', confirm: ''}}
        onSubmit={values => handleRegister(values.email, values.password)}
        validationSchema={registerSchema}>
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
              height: '60%',
              width: '80%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: '#002266',
            }}>
            <View style={{marginBottom: 20}}>
              <Text style={{fontSize: 40, fontWeight: 'bold', color: 'white'}}>
                {'Register'}
              </Text>
            </View>
            <StyledRegisterInput
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
            <StyledRegisterInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <ErrorLabel>
              <ErrorMessage name="password" />
            </ErrorLabel>
            <StyledRegisterInput
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Confirm Password"
              onChangeText={handleChange('confirm')}
              onBlur={handleBlur('confirm')}
              value={values.confirm}
            />
            <ErrorLabel>
              <ErrorMessage name="confirm" />
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
          {'Already have an account? '}
          <TouchableWithoutFeedback onPress={() => navigate('Login')}>
            <Text style={{color: 'orange'}}>{'Click Here'}</Text>
          </TouchableWithoutFeedback>
        </Text>
      </View>
      {RegisterError && (
        <Text style={{color: 'red'}}> {`Error: ${RegisterError}`} </Text>
      )}
    </View>
  );
};