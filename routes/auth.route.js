import express from "express"
const router=express.Router();
import {Login} from "../controller/auth.controller.js"

router.post('/login',Login);


export default router;
