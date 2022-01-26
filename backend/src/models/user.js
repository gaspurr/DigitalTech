const mongoose = require("mongoose")
const Joi = require("joi")

const accountSchema = mongoose.model('Accounts', new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    sectors: {
        type: Array,
        default: [],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}))

const validateUserSchema = (account) => {

    const schema = Joi.object({
        username: Joi.string().required(),
        sectors: Joi.array().required(),
        createdAt: Joi.date()
    })

    return schema.validate(account)
}

exports.Accounts = accountSchema
exports.validate = validateUserSchema
