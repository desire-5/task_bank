const { constants, statusCodesEnum } = require('../configs');
const { OAuth } = require('../dataBase');
const { passwordService, jwtService } = require('../services');
const { userUtil } = require('../utils');

module.exports = {
    login: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await passwordService.compare(password, user.password);

            const tokenPair = jwtService.generateTokens();

            await OAuth.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userUtil.userNormalizator(user)
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const access_token = req.get(constants.AUTHORIZATION);

            await OAuth.deleteOne({ access_token });

            res.status(statusCodesEnum.NO_CONTENT).json('Ok');
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const token = req.get(constants.AUTHORIZATION);
            const { currentUser } = req;

            const tokenPair = jwtService.generateTokens();

            await OAuth.findOneAndUpdate({ refreshToken: token }, { ...tokenPair });

            res.json({
                ...tokenPair,
                user: userUtil.userNormalizator(currentUser)
            });
        } catch (e) {
            next(e);
        }
    },

    logoutAllDevice: async (req, res, next) => {
        try {
            const { currentUser } = req;

            await OAuth.deleteMany({ user: currentUser });

            res.json('Logout from all divice');
        } catch (e) {
            next(e);
        }
    },
};
