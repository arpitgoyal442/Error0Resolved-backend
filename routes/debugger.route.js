import express from "express";
const router = express.Router();

import{getDoubts,makeRequest,getProfile,getNotifications} from "../controller/debugger.controller.js"


router.get("/doubts",getDoubts);
router.post("/request",makeRequest);
router.get("/profile/:debuggerId",getProfile);
router.get("/notifications",getNotifications);

export default router;