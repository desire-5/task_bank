const { Schema, model } = require('mongoose');
const { dbEntityEnum } = require('../configs');

const ActionTokenSchema = new Schema({
    token: {
        type: String,
        required: true
    },
    [dbEntityEnum.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbEntityEnum.USER
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

ActionTokenSchema.pre('findOne', function() {
    this.populate(dbEntityEnum.USER);
});
module.exports = model(dbEntityEnum.ACTION_TOKEN, ActionTokenSchema);
