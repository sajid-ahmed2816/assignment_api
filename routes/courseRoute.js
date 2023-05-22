const express = require("express");
const route = express.Router();
const courseModel = require("../models/coursemodel");
const { sendResponse } = require("../helper/helper");

route.get("/", async (req, res) => {
    try {
        let result = await courseModel.find()
        if (!result) {
            res.send(sendResponse(false, null, "No data found")).status(400);
        }
        else {
            res.send(sendResponse(true, result)).status(200);
        };
    }
    catch (e) {
        res.send(sendResponse(false)).status(400);
    };
});

route.post("/", async (req, res) => {
    let { name, duration, fees, shortName } = req.body;
    try {
        let errArr = [];
        if (!name) {
            errArr.push("Required : Name")
        }
        if (!duration) {
            errArr.push("Required : Duration")
        }
        if (!fees) {
            errArr.push("Required : Fees")
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, "Required mentioned fields")).status(400);
        }
        else {
            let obj = { name, duration, fees, shortName };
            let course = new courseModel(obj);
            await course.save();
            if (!course) {
                res.send(sendResponse(false, null, "Internal server error")).status(400);
            }
            else {
                res.send(sendResponse(true, course, "Saved successfully")).status(200);
            };
        };
    }
    catch (e) {
        res.send(sendResponse(false)).status(400);
    };
});

module.exports = route;