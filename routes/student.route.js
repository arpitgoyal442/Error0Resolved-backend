import express from "express";
const router=express.Router();

import {getDoubts,getAllNotifications,getProfile,declineRequest,acceptRequest} from "../controller/student.controller.js"



router.get("/doubts",getDoubts);
router.get("/notifications",getAllNotifications);
router.post("/acceptrequest",acceptRequest);
router.post("/declinerequest",declineRequest);
router.get("/profile",getProfile);

export default router
