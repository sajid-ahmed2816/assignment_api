const express = require('express');
const route = express.Router();
const studentModel = require("../models/studentmodel")
const { sendResponse } = require("../helper/helper")

route.get("/", async (req, res) => {
    try {
        const result = await studentModel.find();
        if (!result) {
            res.send(sendResponse(false, null, "No data found")).status(400);
        }
        else {
            res.send(sendResponse(true, result)).status(200);
        }
    }
    catch (e) {
        res.send(sendResponse(false)).status(400);
    }
});

route.post("/", async (req, res) => {
    let { firstName, lastName, contact, email, password } = req.body;
    console.log(req.body)
    try {
        let errArr = [];
        if (!firstName) {
            errArr.push("Required : First Name")
        }
        if (!contact) {
            errArr.push("Required : Contact Number")
        }
        if (!email) {
            errArr.push("Required : Email Address")
        }
        if (!password) {
            errArr.push("Required : Password")
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, null, "Require mentioned fields")).status(400);
        }
        else {
            let obj = { firstName, lastName, contact, email, password };
            let student = new studentModel(obj);
            console.log(student)
            await student.save();
            if (!student) {
                res.send(sendResponse(false, null, "Internal Server Error")).status(400);
            }
            else {
                res.send(sendResponse(true, student, "Saved successfully")).status(200);
            }
        }
    }
    catch (e) {
        console.log(e)
        res.send(sendResponse(false, null, "Internal Server Error")).status(400);
    }
})

module.exports = route;