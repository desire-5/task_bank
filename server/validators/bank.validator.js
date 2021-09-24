const Joi = require('joi');

const createBankValidator = Joi.object({
    name: Joi.string().alphanum().min(3).max(30)
        .trim()
        .required(),
    interestRate: Joi.number().required(),
    maximumLoan: Joi.number().required(),
    minimumDownPayment: Joi.number().required()
});

const updateBankValidator = Joi.object({
    _id: Joi.string(),
    name: Joi.string().min(3).max(30)
        .trim(),
    interestRate: Joi.number(),
    maximumLoan: Joi.number(),
    minimumDownPayment: Joi.number()
});

module.exports = {
    createBankValidator,
    updateBankValidator,
};
