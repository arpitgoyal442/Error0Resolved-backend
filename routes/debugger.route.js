import express from "express";
const router = express.Router();


router.get("/debugger/doubts",getDoubts);
router.post("/debugger/request",makeRequest);
router.get("/debugger/profile/:debuggerId",getProfile);
router.get("/debugger/notifications",getNotifications);