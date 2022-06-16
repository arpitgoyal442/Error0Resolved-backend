import express from "express";
const router=express.Router();



router.get("/student/doubts",getDoubts);
router.get("/student/notifications",getAllNotifications);
router.post("/student/acceptdoubt",acceptDoubt);
router.post("/student/declinedoubt",declineDoubt);
router.get("/student/profile",getProfile);
