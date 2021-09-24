const { Bank } = require('../dataBase');
const { bankValidators } = require('../validators');
const ApiError = require('../error/ApiError');
const { statusCodesEnum } = require('../configs');

module.exports = {
    getBankByDynamicParam: (paramName, searchIn = 'body', dbFieldName = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const bank = await Bank.findOne({ [dbFieldName]: value });
            req.bank = bank;
            next();
        } catch (e) {
            next(e);
        }
    },
    isBankByIdExist: (req, res, next) => {
        try {
            const { bank } = req;

            if (!bank) {
                throw new ApiError(statusCodesEnum.NOT_FOUND, 'bank not found');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isValidBankData: (req, res, next) => {
        try {
            const { error, value } = bankValidators.createBankValidator.validate(req.body);

            if (error) {
                throw new ApiError(statusCodesEnum.BAD_REQUEST, error.details[0].message);
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isValidBanktDataUpd: (req, res, next) => {
        try {
            const { error, value } = bankValidators.updateBankValidator.validate(req.body);

            if (error) {
                throw new ApiError(statusCodesEnum.BAD_REQUEST, error.details[0].message);
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    }

};
