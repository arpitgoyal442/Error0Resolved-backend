import express from "express";
const router = express.Router();

import { addNewDoubt,editDoubt,viewDoubt,deleteDoubt,getAllDoubts } from "../controller/doubt.controller.js";

import upload from "../multer.config.js"



router.get("/doubt/all",getAllDoubts);   // if student id is also coming with req. then give doubts of specific student else return all
router.post("/doubt/add",upload.array('myfiles',5),addNewDoubt);
router.get("/doubt/view/:doubtId",viewDoubt);
router.delete("/doubt/delete/:doubtId",deleteDoubt);
router.put("/doubt/edit/:doubtId",editDoubt);


export default router;


