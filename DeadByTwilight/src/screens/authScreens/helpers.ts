import {object, string, number, date, InferType} from 'yup';

export const FormSchema = object({
  email: string().email('Invalid email').required('Must Enter Email'),
  password: string()
    .min(6, 'Password Too Short')
    .max(20, 'password too long')
    .required('Must Enter Password'),
});
