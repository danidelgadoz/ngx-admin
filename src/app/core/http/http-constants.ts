export const ERROR_VALIDATE_EMAIL_PROVIDER = 'ERROR_VALIDATE_EMAIL_PROVIDER';
export const EMAIL_NOTIFICATION_NOT_FOUND = 'EMAIL_NOTIFICATION_NOT_FOUND';
export const MAIL_NOT_FOUNF = 'MAIL_NOT_FOUNF';
export const CODE_NOT_VALID = 'CODE_NOT_VALID';
export const BAD_CREDENTIAL = 'BAD_CREDENTIAL';
export const USER_ALREADY_EXIST = 'USER_ALREADY_EXIST';

export const APP_ERRORS = [
  {
    code: ERROR_VALIDATE_EMAIL_PROVIDER,
    title: 'ERROR_VALIDATE_EMAIL_PROVIDER',
    message: 'Not existing email',
  },
  {
    code: EMAIL_NOTIFICATION_NOT_FOUND,
    title: 'EMAIL_NOTIFICATION_NOT_FOUND',
    message: 'Email and Code Notification not found',
  },
  {
    code: MAIL_NOT_FOUNF,
    title: 'MAIL_NOT_FOUNF',
    message: 'Correo electrónico no encontrado',
  },
  {
    code: CODE_NOT_VALID,
    title: 'CODE_NOT_VALID',
    message: 'Codigo invalido',
  },
  {
    code: BAD_CREDENTIAL,
    title: 'BAD_CREDENTIAL',
    message: 'BAD_CREDENTIAL',
  },
  {
    code: USER_ALREADY_EXIST,
    title: 'USER_ALREADY_EXIST',
    message: 'Usuario ya existe',
  },
];
