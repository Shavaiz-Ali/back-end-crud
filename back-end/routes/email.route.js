import express from "express"
const router = express.Router();
import {register, login, getAllUsers, getSingleUser, updateSingleUser, deleteSingleUser} from  "../contollers/email.controller.js";

router.post("/register", register);
router.post("/login", login);
router.get("/getAllUsers", getAllUsers);
router.get("/getSingleUser/:id", getSingleUser);
router.put("/updateSingleUser/:id", updateSingleUser);
router.delete("/deleteSingleUser/:id", deleteSingleUser);


export default router;