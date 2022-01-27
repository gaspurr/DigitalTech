const { Accounts, validate } = require("../models/user")


exports.createUser = async (req, res) => {

    const { error } = validate(req.body)
    if (error) {
        return res.status(400).json({ message: error })
    }
    const {
        username,
        sectors
    } = req.body


    //check if user already exists
    const user = await Accounts.findOne({ username: username })

    if (user) {
        res.status(400).send('This user already exists')
    } else {

        const newUser = new Accounts({
            username: username,
            sectors: sectors
        })

        const saveUser = await newUser.save()
        if (!saveUser) throw Error("Error saving user")

        res.status(201).send({message: "User created successfully" + newUser})
    }

}

exports.checkUser = async (req, res) => {

    const { id } = req.params

    const user = await Accounts.findOne({ username: id });

    if (!user) {
        return res.status(400).send({ message: "No users found by this username" })
    } else {
        return res.status(200).send(user)
    }
}

exports.getUsers = async (req, res) => {
    const users = await Accounts.find({});

    if (!users) {
        return res.status(400).send({ message: "No users to display" })
    } else {
        return res.status(200).send(users)
    }

}
//update sectors array
exports.updateUser = async (req, res) => {
    const { username } = req.params

    try {
        const update = await Accounts.findOneAndUpdate({
            username: username
        }, {
            $set: {
                sectors: req.body
            }

        }, { new: true })

        res.status(200).send(update)
    } catch (e) {
        res.status(400).send({ message: "Something went wrong while trying to update the user's data" })
    }


}