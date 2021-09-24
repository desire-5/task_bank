const bcrypt = require('bcrypt');

const ApiError = require('../error/ApiError');
const { statusCodesEnum } = require('../configs');

module.exports = {
    hash: (pass) => bcrypt.hash(pass, 5),
    compare: async (pass, hashPassword) => {
        const isPasswordMatched = await bcrypt.compare(pass, hashPassword);

        if (!isPasswordMatched) {
            throw new ApiError(statusCodesEnum.BAD_REQUEST, 'Email or password is wrong');
        }
    }
};
