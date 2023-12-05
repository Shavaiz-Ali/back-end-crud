import express from "express";
const router = express.Router();
import emailRoute from "./email.route.js";

router.use("/user", emailRoute);

export default router