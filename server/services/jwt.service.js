const jwt = require('jsonwebtoken');

const ApiError = require('../error/ApiError');
const { statusCodesEnum, config } = require('../configs');

module.exports = {
    generateTokens: () => {
        const access_token = jwt.sign({}, config.ACCESS_TOKEN_SECRET, { expiresIn: '30min' });
        const refresh_token = jwt.sign({}, config.REFRESH_TOKEN_SECRET, { expiresIn: '30d' });

        return {
            access_token,
            refresh_token
        };
    },

    verifyToken: (token, tokenType = 'access') => {
        try {
            const secret = tokenType === 'access' ? config.ACCESS_TOKEN_SECRET : config.REFRESH_TOKEN_SECRET;

            jwt.verify(token, secret);
        } catch (e) {
            throw new ApiError(statusCodesEnum.UNA, 'Invalid token');
        }
    }
};
