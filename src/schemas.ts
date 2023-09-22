import * as yup from 'yup';

export const loginSchema = (t) => {
  return yup
    .object({
      email: yup
        .string()
        .email(t('validation.email.invalid'))
        .required(t('validation.email.required')),
      password: yup
        .string()
        .min(5, t('validation.password.min'))
        .max(50, t('validation.password.max'))
        .required(t('validation.password.required')),
    })
    .required();
};

export const authSchema = (t) => {
  return yup
    .object({
      email: yup
        .string()
        .email(t('validation.email.invalid'))
        .required(t('validation.email.required')),
    })
    .required();
};
