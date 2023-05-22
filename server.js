const express = require('express');
const studentRoute = require('./routes/studentRoute');
const teacherRoute = require("./routes/teacherRoute");
const instituteRoute = require("./routes/instituteRoute");
const courseRoute = require("./routes/courseRoute")
require("dotenv").config();
const mongoose = require("mongoose");

const app = express();

app.use(express.json())

app.use("/api/student", studentRoute);
app.use("/api/teacher", teacherRoute);
app.use("/api/institute", instituteRoute);
app.use("/api/course", courseRoute);

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log("Database connected Successfully and Server Connected on 5000")
        });
    })
    .catch((err) => {
        console.log(err)
    });
