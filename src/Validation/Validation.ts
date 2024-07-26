import {validEmail, validPassword} from '../RegExp/RegExp';

// Define possible validation types
export type ValidationType = 'email' | 'phone' | 'password' | 'required';

const validate = (
  value: string | undefined|null,
  validationType?: ValidationType,
): string | boolean => {
  if (value) {
    if (validationType === 'email') {
      return validEmail.test(value) ? true : false;
    } else if (validationType === 'password') {
      return validPassword.test(value) ? true : false;
    } else if (validationType === 'phone') {
      return value.length >= 10 ? true : false;
    } else if (validationType === 'required') {
      return value.trim() !== '' ? true : false;
    } else {
      // Default case for unknown validationType
      return value.trim() !== '' ? true : false;
    }
  } else return false;
};

export default validate;
