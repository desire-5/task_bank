const { User } = require('../dataBase');

const { userValidators } = require('../validators');
const ApiError = require('../error/ApiError');
const { statusCodesEnum } = require('../configs');

module.exports = {
    isMailExist: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ApiError(statusCodesEnum.CONFLICT, 'Email is already exist');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserByIdExist: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ApiError(statusCodesEnum.NOT_FOUND, 'User not found');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    checkUserRole: (rolesArr = []) => (req, res, next) => {
        try {
            const { role } = req.currentUser;

            if (!rolesArr.length) {
                return next();
            }

            if (!rolesArr.includes(role)) {
                throw new ApiError(statusCodesEnum.FORBIDEN, 'Access forbiden');
            }
            next();
        } catch (e) {
            next(e);
        }
    },
    getUserByDynamicParam: (paramName, searchIn = 'body', dbFieldName = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const user = await User.findOne({ [dbFieldName]: value });
            console.log('^^^^^^', user);

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isValidUserData: (req, res, next) => {
        try {
            const { error, value } = userValidators.createUserValidator.validate(req.body);

            if (error) {
                throw new ApiError(statusCodesEnum.BAD_REQUEST, error.details[0].message);
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
    isValidUserDataUpd: (req, res, next) => {
        try {
            const { error, value } = userValidators.updateUserValidator.validate(req.body);

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
