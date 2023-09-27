import * as yup from 'yup';

export const loginSchema = (t) => {
  return yup
    .object({
      email: yup
        .string()
        .email(t('form.email.invalid'))
        .required(t('form.email.required')),
      password: yup
        .string()
        .min(5, t('form.password.min'))
        .max(50, t('form.password.max'))
        .required(t('form.password.required')),
    })
    .required();
};

export const authSchema = (t) => {
  return yup
    .object({
      email: yup
        .string()
        .email(t('form.email.invalid'))
        .required(t('form.email.required')),
    })
    .required();
};

export const registerSchema = (t) => {
  return yup
    .object({
      email: yup
        .string()
        .email(t('form.email.invalid'))
        .required(t('form.email.required')),
      name: yup.string().required(t('form.name.required')),
      lastname: yup.string().required(t('form.lastname.required')),
      date_of_birth: yup.string().required(t('form.date_of_birth.required')),
      password: yup
        .string()
        .min(5, t('form.password.min'))
        .max(50, t('form.password.max'))
        .required(t('form.password.required')),
      password_confirmation: yup
        .string()
        .oneOf([yup.ref('password')], t('form.password_confirmation.match'))
        .required(t('form.password_confirmation.required')),
    })
    .required();
};

export const forgotSchema = (t) => {
  return yup
    .object({
      email: yup
        .string()
        .email(t('form.email.invalid'))
        .required(t('form.email.required')),
    })
    .required();
};
