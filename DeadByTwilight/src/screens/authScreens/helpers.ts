import {object, string, ref} from 'yup';

export const loginSchema = object({
  email: string().email('Invalid email').required('Must Enter Email'),
  password: string()
    .min(6, 'password too short')
    .max(20, 'password too long')
    .required('must enter password'),
});

export const registerSchema = object({
  email: string().email('Invalid email').required('must enter email'),
  displayName: string().required('must enter display name'),
  password: string()
    .min(6, 'password too short')
    .max(20, 'password too long')
    .required('must enter password'),
  confirm: string()
    .oneOf([ref('password')], "passwords don't match")
    .required('confirm password is required'),
});
