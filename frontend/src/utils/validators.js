const MIN_PASSWORD_LENGTH = 6;
const MAX_NAME_LENGTH = 10
const EMAIL_PATTERN = '^.+@.+$';
const PHONE_PATTERN = '^\\d{3}-?\\d{7}$';

const ERROR_MESSAGES = {
    email: "Invalid Email address.",
    password: `Password's length must be ${MIN_PASSWORD_LENGTH} or higher.`,
    passConfirm: "Confirm password doesn't match.",
    name: `Name length cannot be loner than ${MAX_NAME_LENGTH} or empty.`,
    phone: `Phone number must contain 10 digits only.`,
}

const emailValidator = email => new RegExp(EMAIL_PATTERN).test(email);
const passwordValidator = password => password.length >= MIN_PASSWORD_LENGTH;
const nameValidator = name => name.length > 0 && name.length <= MAX_NAME_LENGTH;
const phoneValidator = phone => new RegExp(PHONE_PATTERN).test(phone);

/* EXPORTS */

export const loginValidator = ({email, password}) =>{
    if(!emailValidator(email)) throw new Error(ERROR_MESSAGES.email);
    if(!passwordValidator(password)) throw new Error(ERROR_MESSAGES.password);
}

export const registerValidator = ({email, password, first_name, last_name}) =>{
    if(!emailValidator(email)) throw new Error(ERROR_MESSAGES.email);
    if(!passwordValidator(password)) throw new Error(ERROR_MESSAGES.password);
    if(!nameValidator(first_name)) throw new Error(ERROR_MESSAGES.name);
    if(!nameValidator(last_name)) throw new Error(ERROR_MESSAGES.name);
}

export const editValidator = ({email, first_name, last_name}) =>{
    if(!emailValidator(email)) throw new Error(ERROR_MESSAGES.email);
    if(!nameValidator(first_name)) throw new Error(ERROR_MESSAGES.name);
    if(!nameValidator(last_name)) throw new Error(ERROR_MESSAGES.name);
}

