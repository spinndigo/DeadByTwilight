import Yup from 'yup';

export const FormSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Must Enter Email'),
  password: Yup.string()
    .min(6, 'Password Too Short')
    .max(20, 'password too long')
    .required('Must Enter Password'),
});
