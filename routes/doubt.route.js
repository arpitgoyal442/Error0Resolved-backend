import express from "express";
const router = express.Router();


import { addNewDoubt,editDoubt,viewDoubt,deleteDoubt,getAllDoubts } from "../controller/doubt.controller.js";

import upload from "../multer.config.js"



router.get("/all",getAllDoubts);   
router.post("/add",upload.array('myfiles',5),addNewDoubt);
router.get("/:doubtId",viewDoubt);
router.delete("/:doubtId",deleteDoubt);
router.put("/:doubtId",editDoubt);


export default router;



// Chattting -- socket.io
// filter route

