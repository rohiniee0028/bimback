const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { userModel } = require('../Models/user.models');

const User = express()

User.post("/login", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body
    try {
        console.log(email,password);
        const user = await userModel.findOne({ email })
        console.log(user);
        const verify = bcrypt.compareSync(password,user.password);
        if (verify) {
            const token = jwt.sign({email},"secret");
            return res.send({"token":token,"response": "Success" })
        }else{
            return res.send({ "response": "Fail" })
        }
        
    } catch (error) {
        console.log(error);
        return res.send({"response":"Check Username and Password"});
    }

})

User.post("/register", async (req, res) => {
    const { name, email, password } = req.body
    const passHash = bcrypt.hashSync(password,10);
    try {
        const new_user = new userModel({
            name,
            email,
            password : passHash
        })
        await new_user.save()
        if (new_user.name === "" || new_user.email==="" || new_user.password === "") {
            return res.send({ "response": "Fail" })
        }
        return res.send({"response":"Success"})
    } catch (error) {
        return res.send(err)
    }

})

User.post("/getProfile", async (req, res) => {
    // console.log(req.body);
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email, password })
        res.send(user)
    } catch (error) {
        return res.send({response:"Check Username and Password"});
    }
})

User.post("/calculateBmi", async (req, res) => {
    const { hf, w} = req.body
     let hm = (hf/ 3.2808);
     let bmi = (w/hm);
    return res.send({bmi})
    
})

module.exports = { User }