import express from "express";
const router = express.Router();


import { addNewDoubt,editDoubt,viewDoubt,deleteDoubt,getAllDoubts,statusFilterDoubts,filterPrice } from "../controller/doubt.controller.js";

import upload from "../multer.config.js"



router.get("/all",getAllDoubts);   
router.post("/add",upload.array('myfiles',5),addNewDoubt);
// Filters **START**
router.get("/filterstatus",statusFilterDoubts);
router.get("/filterprice",filterPrice);  // send data sorted by price in descending order

//Filters **END**
router.get("/:doubtId",viewDoubt);
router.delete("/:doubtId",deleteDoubt);
router.put("/:doubtId",upload.array('myfiles',5),editDoubt);




export default router;



// Chattting -- socket.io
// filter route

