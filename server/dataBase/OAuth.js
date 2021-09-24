const { Schema, model } = require('mongoose');
const { dbEntityEnum } = require('../configs');

const OAuthSchema = new Schema({
    access_token: {
        type: String,
        required: true
    },
    refresh_token: {
        type: String,
        required: true
    },
    [dbEntityEnum.USER]: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: dbEntityEnum.USER
    },
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });

OAuthSchema.pre('findOne', function() {
    this.populate(dbEntityEnum.USER);
});
module.exports = model(dbEntityEnum.OAUTH, OAuthSchema);
