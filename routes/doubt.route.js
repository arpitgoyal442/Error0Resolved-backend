import express from "express";
const router = express.Router();


import { addNewDoubt,editDoubt,viewDoubt,deleteDoubt,getAllDoubts } from "../controller/doubt.controller.js";

import upload from "../multer.config.js"



router.get("/all",getAllDoubts);   
router.post("/add",upload.array('myfiles',5),addNewDoubt);
router.get("/view/:doubtId",viewDoubt);
router.delete("/delete/:doubtId",deleteDoubt);
router.put("/edit/:doubtId",editDoubt);


export default router;


