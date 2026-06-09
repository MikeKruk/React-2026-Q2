import * as yup from 'yup';
import { COUNTRIES } from '../../../shared/constants/constants';
export const formSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .test('uppercase', 'First letter must be uppercase', (val) =>
      val ? val[0] === val[0].toUpperCase() : false
    ),
  age: yup
    .number()
    .typeError('Age must be a number')
    .required('Age is required')
    .min(0, 'Age cannot be negative'),
  email: yup
    .string()
    .required('Email is required')
    .test('email', 'Invalid email', (val) => {
      if (!val) return false;
      const parts = val.split('@');
      if (parts.length !== 2) return false;
      const [local, domain] = parts;
      if (!local) return false;
      if (!domain.includes('.')) return false;
      return true;
    }),
  gender: yup.string().required('Gender is required').oneOf(['male', 'female']),
  terms: yup
    .boolean()
    .required()
    .oneOf([true], 'You must accept Terms and Conditions'),
  password: yup
    .string()
    .required('Password is required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup
    .string()
    .required('Please confirm password')
    .oneOf([yup.ref('password')], 'Passwords must match'),

  country: yup
    .string()
    .required('Country is required')
    .test('country', 'Country must be valid', (val) =>
      COUNTRIES.includes(val ?? '')
    ),
  image: yup
    .mixed<File>()
    .required('Image is required')
    .test('fileType', 'Only PNG and JPEG allowed', (val) =>
      val instanceof File
        ? ['image/png', 'image/jpeg'].includes(val.type)
        : false
    )
    .test('fileSize', 'Image must be less than 2MB', (val) =>
      val instanceof File ? val.size <= 2 * 1024 * 1024 : false
    ),
});

export type FormValues = yup.InferType<typeof formSchema>;