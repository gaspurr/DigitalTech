const mongoose = require("mongoose")
const Joi = require("joi")

const userSchema = mongoose.model('User', new mongoose.Schema({
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

const validateUserSchema = (user) => {

    const schema = Joi.object({
        username: Joi.string().required(),
        sectors: Joi.array().required(),
        createdAt: Joi.date()
    })

    return schema.validate(user)
}

exports.User = userSchema
exports.validate = validateUserSchema
