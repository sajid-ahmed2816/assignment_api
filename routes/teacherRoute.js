const express = require("express");
const route = express.Router();
const teacherModel = require("../models/teachermodel");
const { sendResponse } = require("../helper/helper")

route.get("/", async (req, res) => {
    try {
        let result = await teacherModel.find();
        if (!result) {
            res.send(sendResponse(false, null, "No data found")).status(400);
        }
        else {
            res.send(sendResponse(true, result)).status(200);
        }
    }
    catch (e) {
        res.send(sendResponse(false)).status(400);
    };
});

route.post("/", async (req, res) => {
    let { name, contact, course } = req.body
    console.log(req.body)
    try {
        let errArr = []
        if (!name) {
            errArr.push("Required : Name")
        }
        if (!contact) {
            errArr.push("Required : Contact")
        }
        if (!course) {
            errArr.push("Required : Course")
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, "Required mentioned fields")).status(400);
        }
        else {
            let obj = { name, contact, course }
            let teacher = new teacherModel(obj);
            await teacher.save()
            console.log(teacherModel)
            if (!teacher) {
                res.send(sendResponse(false, null, "Internal server error")).status(400);
            }
            else {
                res.send(sendResponse(true, teacher, "Saved successfully")).status(200);
            };
        };
    }
    catch (e) {
        console.log(e)
        res.send(sendResponse(false)).status(400);
    };
});

module.exports = route