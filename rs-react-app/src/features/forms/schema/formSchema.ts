import * as yup from 'yup';
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
});

export type FormValues = yup.InferType<typeof formSchema>;
