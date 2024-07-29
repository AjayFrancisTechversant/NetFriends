import {validEmail, validPassword} from '../RegExp/RegExp';

// Define possible validation types
export type ValidationType = 'email' | 'phone' | 'password' | 'required';

const validate = (
  value: string | undefined | null,
  validationType?: ValidationType,
): string | boolean => {
  if (!value) return false;

  switch (validationType) {
    case 'email':
      return validEmail.test(value) ? true : false;

    case 'password':
      return validPassword.test(value) ? true : false;

    case 'phone':
      return value.length >= 10 ? true : false;

    case 'required':
      return value.trim() !== '' ? true : false;

    default:
      // Default case for unknown validationType
      return value.trim() !== '' ? true : false;
  }
};

export default validate;
