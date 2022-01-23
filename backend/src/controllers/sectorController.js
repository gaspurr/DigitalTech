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
        //check if a sector already exists
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
            if (!saveSector) throw Error("Error saving a new sector :(")

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
    const sectors = await Sector.find();

    if (!sectors) {
        res.status(400).send({ message: "No Sectors to display" })
    }
    return res.status(200).send(sectors)
}

//fetch one Sector's data
exports.getSectorsData = async (req, res) => {
    const {
        id
    } = req.params
    const sector = await Sector.findOne({ _id: id });

    if (!sector) {
        res.status(400).send({ message: "No Sectors to display" })
    }
    return res.status(200).send(sector)

}

//Append data to db
exports.appendSectorData = async (req, res) => {
    const { id } = req.params


    const body = req.body

    const sector = await Sector.findOneAndUpdate({
        _id: id
    }, {
        $push: {
            data: body
        }
    })

    if (body.length <= 0) {
        return res.status(400).send({ message: "The request body is empty " })
    } else if (!sector) {
        return res.status(400).send({ message: "Couldn't find the specified Sector" })
    } else {
        return res.status(200).send({ message: "Successfuly appended the data!" })
    }


}

//delete sub-categories
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
