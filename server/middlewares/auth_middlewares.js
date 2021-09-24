const {
    constants,
    statusCodesEnum,
} = require('../configs');
const { userValidators } = require('../validators');
const ApiError = require('../error/ApiError');
const { jwtService } = require('../services');
const { ActionToken, OAuth } = require('../dataBase');

module.exports = {
    checkAccessToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ApiError(statusCodesEnum.UNAUTHORIZED, 'No token');
            }

            await jwtService.verifyToken(token);

            const isToken = await OAuth.findOne({ access_token: token });

            if (!isToken) {
                throw new ApiError(statusCodesEnum.UNAUTHORIZED, 'Invalid token');
            }

            req.currentUser = isToken.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ApiError(statusCodesEnum.UNAUTHORIZED, 'No token');
            }

            await jwtService.verifyToken(token, 'refresh');

            const isToken = await OAuth.findOne({ refresh_token: token });
            // .populate(dbEntityEnum.USER);

            if (!isToken) {
                throw new ApiError(statusCodesEnum.UNAUTHORIZED, 'Invalid token');
            }

            req.currentUser = isToken.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkActionToken: (actionType) => async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);

            if (!token) {
                throw new ApiError(statusCodesEnum.UNAUTHORIZED, 'No token');
            }

            await jwtService.verifyActionToken(actionType, token);

            const isToken = await ActionToken.findOne({ token });
            // .populate(dbEntityEnum.USER);

            if (!isToken) {
                throw new ApiError(statusCodesEnum.UNAUTHORIZED, 'Invalid token');
            }

            req.currentUser = isToken.user;

            next();
        } catch (e) {
            next(e);
        }
    },

    PasswordValidate: (req, res, next) => {
        try {
            const { error, value } = userValidators.passwordValidator.validate(req.body);

            if (error) {
                throw new ApiError(statusCodesEnum.BAD_REQUEST, error.details[0].message);
            }
            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },
};
