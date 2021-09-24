const { Schema, model } = require('mongoose');
const { dbEntityEnum } = require('../configs');

// const bankShema = {
//     name: { type: String },
//     interestRate: { type: Number },
//     loanTerm: { type: Number },
// };

const historyShema = {
    month: { type: Number },
    totalPayment: { type: Number },
    interestPayment: { type: Number },
    loanBalance: { type: Number },
    res: { type: Number },
};

const MortageSchema = new Schema({
    initialLoan: { type: Number },
    downPayment: { type: Number },
    [dbEntityEnum.BANK]: {
        type: Schema.Types.ObjectId,
        ref: dbEntityEnum.BANK
    },
    history: [historyShema],
    [dbEntityEnum.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbEntityEnum.USER
    }
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

MortageSchema.pre('findOne', function(next) {
    this.populate(dbEntityEnum.USER);
    this.populate(dbEntityEnum.BANK);
    // exec();
    next();
});
module.exports = model(dbEntityEnum.MORTAGE, MortageSchema);
