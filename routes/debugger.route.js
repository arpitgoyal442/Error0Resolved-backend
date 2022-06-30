import express from "express";
const router = express.Router();

import{makeRequest,getProfile,getNotifications} from "../controller/debugger.controller.js"



router.post("/request/:debuggerId",makeRequest);
router.get("/profile/:debuggerId",getProfile);
router.get("/notifications/:debuggerId",getNotifications);

export default router;