const express = require('express');
const cors = require('cors');
const { connection } = require('./config/db');
const { User } = require('./routers/user.route');

const app = express()

app.use(express.json())

app.use(cors({
    origin: '*'
}));

app.get("/", (req, res) => {
    res.send({"greeting":"Welcome"})
})

app.use("/user", User)

app.listen(3001, async () => {
    try {
        await connection
        console.log("Database is connected at http://localhost:3001");
        console.log("3000 is done");
    } catch (err) {
        console.log("There is some error :" + err);
    }
})