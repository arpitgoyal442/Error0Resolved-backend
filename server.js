import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import doubtroutes from "./routes/doubt.route.js"
import debuggerroutes from "./routes/debugger.route.js"
import studentroutes from "./routes/student.route.js"


import cors from "cors"
const app = express();


// MIddlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


// Database Connection

mongoose.connect("mongodb+srv://error_resolved:O0ow9RpxGQyu6QRw@cluster0.acw5v.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", () => { console.log("Error in Connection with DB") });
db.once("open", function () {
    console.log(" DB Connected successfully");
});





//  Routes
app.get("/", (req, res) => {

    res.send("Welcome To Error:Resolved");
})

app.use("/doubt/",doubtroutes);
app.use("/debugger/",debuggerroutes);
app.use("/student/",studentroutes);





app.listen('9000', () => {

    console.log("App Started on port 9000");
})