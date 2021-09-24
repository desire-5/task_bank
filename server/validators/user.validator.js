const Joi = require('joi');

const userRolesEnum = require('../configs/user_roles_enum');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../configs/constants');

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(3).max(30)
        .trim()
        .required(),
    password: Joi.string().regex(PASSWORD_REGEXP).trim()
        .required(),
    email: Joi.string().lowercase().regex(EMAIL_REGEXP).trim()
        .required(),
    role: Joi.string().allow(...Object.values(userRolesEnum)),
});

const updateUserValidator = Joi.object({
    _id: Joi.string(),
    name: Joi.string().alphanum().min(3).max(30)
        .trim(),
    email: Joi.string().lowercase().regex(EMAIL_REGEXP).trim(),
    role: Joi.string().allow(...Object.values(userRolesEnum)),
});

const passwordValidator = Joi.object({
    password: Joi.string().regex(PASSWORD_REGEXP).trim()
        .required(),
});

module.exports = {
    createUserValidator,
    updateUserValidator,
    passwordValidator
};
