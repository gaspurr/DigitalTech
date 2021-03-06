const cors = require("cors")
const express = require("express")
require("dotenv").config()
const mongoose = require("mongoose")
const sectorRoutes = require("./routes/sector")
const userRoutes = require("./routes/user")
const bodyParser = require("body-parser")
const path = require("path");

const PORT = process.env.PORT || 8081;
const app = express()
app.use(cors())
app.use(express.json())


app.use(bodyParser.json({ limit: "2mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "2mb", extended: true }))

app.use('/', sectorRoutes)
app.use('/user', userRoutes)

app.get("*", (req, res) => {
    res.send("This route doesn't exist!")
})


mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("Succesfully connected to MongoDB")
        app.listen(PORT, () => console.log(`Server started on PORT ${PORT}`))
    })
    .catch((err) => {
        console.log(err)
        process.exit(1)
    })
