const { Schema, model } = require('mongoose');
const { dbEntityEnum } = require('../configs');

const bankSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    interestRate: {
        type: Number,
        required: true,
    },
    maximumLoan: {
        type: Number,
        required: true
    },
    minimumDownPayment: {
        type: Number,
        required: true
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

module.exports = model(dbEntityEnum.BANK, bankSchema);
