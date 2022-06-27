import express from "express";
const router=express.Router();

import {getDoubts,getAllNotifications,getProfile,declineRequest,acceptRequest} from "../controller/student.controller.js"



router.get("/doubts/:studentId",getDoubts);
router.get("/notifications/:studentId",getAllNotifications);
router.post("/acceptrequest",acceptRequest);    // when stdent click on accept then here in req body we get { doubtid and debuggerid} so set debuggerid in doubt schema  and mark the doubt inactive 
router.post("/declinerequest",declineRequest);  // here add new notification in bebugger about rejection remove the notofocation from student model
router.get("/profile/:studentId",getProfile);   // Fetch student profile 

export default router
