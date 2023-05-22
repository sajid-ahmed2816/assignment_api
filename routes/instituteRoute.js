const express = require("express");
const route = express.Router()
const instituteModel = require("../models/institutemodel")
const { sendResponse } = require("../helper/helper")

route.get("/", async (req, res) => {
    try {
        let result = await instituteModel.find();
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
    let { name, address, shortName, tel } = req.body;
    try {
        let errArr = [];
        if (!name) {
            errArr.push("Required : Name")
        }
        if (!address) {
            errArr.push("Required : Address")
        }
        if (!tel) {
            errArr.push("Required : Telephone Number")
        }
        if (errArr.length > 0) {
            res.send(sendResponse(false, errArr, "Required mentioned fields")).status(400);
        }
        else {
            let obj = { name, address, shortName, tel }
            let institute = new instituteModel(obj);
            await institute.save();
            if (!institute) {
                res.send(sendResponse(false, null, "Internal server error")).status(400);
            }
            else {
                res.send(sendResponse(true, institute, "Saved successfully")).status(200);
            };
        };
    }
    catch (e) {
        res.send(sendResponse(false)).status(400)
    };
});

module.exports = route;