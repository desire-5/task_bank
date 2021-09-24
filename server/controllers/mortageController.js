const { Mortage, Bank, User } = require('../dataBase');
const ApiError = require('../error/ApiError');

module.exports = {

    getAllMortages: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const data = await Mortage.find({ user: user_id });

            if (!data) {
                throw new ApiError(404, 'Mortages not found');
            }

            res.json(data);
        } catch (e) {
            next(e);
        }
    },

    deleteMortageById: async (req, res, next) => {
        try {
            const { id } = req.params;
            if (!id) {
                throw new ApiError(404, 'id not pass');
            }
            const mortage_del = await Mortage.findOneAndDelete(id);

            res.json(mortage_del);
        } catch (e) {
            next(e);
        }
    },

    createMortage: async (req, res, next) => {
        try {
            const { user_id, bank_id } = req.params;
            const { currentUser, bank } = req;
            const mortage = await Mortage.create({ ...req.body, user: user_id, bank: bank_id });

            res.status(201).json(mortage, currentUser, bank);
        } catch (e) {
            next(e);
        }
    }

};
