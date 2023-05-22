const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
        required: true
    },
    shortName: {
        type: String,
    }
});

const courseModel = mongoose.model("Course", courseSchema);

module.exports = courseModel;