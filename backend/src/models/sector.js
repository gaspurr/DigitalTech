const mongoose = require("mongoose")
const Joi = require("joi")

const sectorSchema = mongoose.model('Sector', new mongoose.Schema({
    groupName: {
        type: String,
        required: true,
    },
    subCategories: {
        type: Array,
        default: []
    }
}))

const validateSectorData = (sector) => {

    const schema = Joi.object({
        groupName: Joi.string().required(),
        subCategories: Joi.array()
    })

    return schema.validate(sector)
}

exports.Sector = sectorSchema
exports.validate = validateSectorData
