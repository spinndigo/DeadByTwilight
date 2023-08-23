import {
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {global} from '../../styles';
import {ErrorMessage, Formik} from 'formik';
import {auth} from '../../firebase/config';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
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
  const {currentUser} = useContext(CurrentUserContext);
  const [RegisterError, setRegisterError] = useState('');
  const handleRegister = async (
    email: string,
    password: string,
    displayName: string,
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async userCredential => {
        const user = userCredential.user;
        await sendEmailVerification(user);
        await updateProfile(user, {displayName}).catch(err => console.log(err));
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
        initialValues={{email: '', password: '', confirm: '', displayName: ''}}
        onSubmit={values =>
          handleRegister(values.email, values.password, values.displayName)
        }
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
              height: '70%',
              width: '80%',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
              backgroundColor: '#002266',
            }}>
            {isSubmitting ? (
              <ActivityIndicator size="large" color="white" />
            ) : (
              <>
                <View style={{marginBottom: 20}}>
                  <Text
                    style={{fontSize: 40, fontWeight: 'bold', color: 'white'}}>
                    {'Register'}
                  </Text>
                </View>
                <StyledRegisterInput
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

                <StyledRegisterInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  placeholder="Display Name"
                  onChangeText={handleChange('displayName')}
                  onBlur={handleBlur('displayName')}
                  value={values.displayName}
                />
                <ErrorLabel>
                  <ErrorMessage name="displayName" />
                </ErrorLabel>

                <StyledRegisterInput
                  textContentType="password"
                  secureTextEntry={true}
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
                  textContentType="password"
                  secureTextEntry={true}
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
                    style={{
                      backgroundColor: 'white',
                      padding: 20,
                      width: '50%',
                    }}>
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
              </>
            )}
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
