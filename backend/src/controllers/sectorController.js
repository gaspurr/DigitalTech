const { Sector, validate } = require("../models/sector")

exports.createSector = async (req, res) => {
    const { error } = validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.message })
    }

    const {
        groupName,
        subCategories
    } = req.body;

    try {
        //check if a input data is not repeated since time can never be a duplicate value
        let sector = await Sector.findOne({
            groupName: groupName,
        })

        if(sector) {
            return res.status(400).send({ message: 'This Sector already exists!' })
        } else {
            const newSector = new Sector({
                groupName: groupName,
                subCategories: subCategories
            })

            const saveSector = await newSector.save()
            if (!saveSector) throw Error("Error saving a new Sector :(")

            return res.status(201).send({
                message: "Sector data created successfully"
            })
        }
    } catch (error) {
        return res.status(409).send({ message: "Critical error: " + error.message })
    }
}

//get all Sectors
exports.getAllData = async (req, res) => {
    const Sectors = await Sector.find();

    if (!Sectors) {
        res.status(400).send({ message: "No Sectors to display" })
    }
    return res.status(200).send(Sectors)
}

//fetch one Sector's data
exports.getSectorsData = async (req, res) => {
    const {
        id
    } = req.params
    const Sector = await Sector.findOne({ _id: id });

    if (!Sector) {
        res.status(400).send({ message: "No Sectors to display" })
    }
    return res.status(200).send(Sector)

}

//Append data to db
exports.appendSectorData = async (req, res) => {
    const { id } = req.params


    const body = req.body

    const Sector = await Sector.findOneAndUpdate({
        _id: id
    }, {
        $push: {
            data: body
        }
    })

    if (body.length <= 0) {
        return res.status(400).send({ message: "The request body is empty " })
    } else if (!Sector) {
        return res.status(400).send({ message: "Couldn't find the specified Sector" })
    } else {
        return res.status(200).send({ message: "Successfuly appended the data!" })
    }


}

//set Sector's data to be null
exports.deleteAllDataFromSector = async (req, res) => {
    const { id } = req.params

    try {
        const body = await Sector.updateOne({
            _id: id
        }, {
            $set: {
                "data": []
            }
        })

        res.status(200).send({ message: `Sector's ${id} data has been erased` })
    } catch (e) {
        console.log(e)
    }
}
