import { FieldErrors, FieldValues } from 'react-hook-form';

export const appErrors = {
  messages: {
    required: 'Field is required',
    email: 'Enter a valid email address',
    password: (size: number) => `Password must contain at least ${size} digits`,
  },
  getMessage: (field: string, errors: FieldErrors<FieldValues>) =>
    errors[field]?.message?.toString(),
};
