const { Bank } = require('../dataBase');
const ApiError = require('../error/ApiError');

module.exports = {
    getBankById: async (req, res, next) => {
        try {
            const { bank_id } = req.params;
            const data = await Bank.findById(bank_id);

            if (!data) {
                throw new ApiError(404, 'Bank not found');
            }

            res.json(data);
        } catch (e) {
            next(e);
        }
    },

    getAllBanks: async (req, res, next) => {
        try {
            const data = await Bank.find();

            if (!data) {
                throw new ApiError(404, 'Bank not found');
            }

            res.json(data);
        } catch (e) {
            next(e);
        }
    },

    deleteBankById: async (req, res, next) => {
        try {
            const { bank_id } = req.params;
            if (!bank_id) {
                throw new ApiError(404, 'id not pass');
            }
            const bank_del = await Bank.findOneAndDelete(bank_id);

            res.json(bank_del);
        } catch (e) {
            next(e);
        }
    },

    createBank: async (req, res, next) => {
        try {
            const bank = await Bank.create(req.body);

            res.status(201).json(bank);
        } catch (e) {
            next(e);
        }
    },

    updateBank: async (req, res, next) => {
        try {
            const { bank_id } = req.params;
            const updatedBank = await Bank.findByIdAndUpdate(bank_id, req.body, { new: true });
            res.json(updatedBank);
        } catch (e) {
            next(e);
        }
    },
};
