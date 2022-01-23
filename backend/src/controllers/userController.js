const { User, validate } = require("../models/user")


exports.createUser = async (req, res) => {

    const { error } = validate(req.body)
    if (error) {
        return res.status(400).json({ message: error.message })
    }


    const {
        username,
        sectors
    } = req.body;

    try {
        //check if user already exists
        let user = await User.findOne({ username: username })

        if (user) {
            return res.status(400).send('This user already exists')
        } else {

            const newUser = new User({
                username,
                sectors
            })

            const saveUser = await newUser.save()
            if (!saveUser) throw Error("Error saving user")

            return res.status(201).json({
                message: "User created successfully"
            })
        }
    } catch (error) {
        return res.status(409).json({ message: error.message })
    }
}

exports.checkUser = async (req, res) => {

    const user = await User.findOne({ username: req.params.username });

    if (!user) {
        res.status(400).send({message: "No users found by this username"})
    }else{
        res.status(200).send(user)
    }



}