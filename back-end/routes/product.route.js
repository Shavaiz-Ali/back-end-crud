import express from "express";
import {addProduct, getAllProducts, getSingleProduct, deleteSingleProduct, updateSingleProduct} from "../contollers/product.controller.js"
const router = express.Router();

router.post("/addProduct", addProduct);
router.get("/getAllProducts", getAllProducts);
router.get("/getSingleProduct/:id", getSingleProduct);
router.delete("/deleteSingleProduct/:id", deleteSingleProduct);
router.put("/updateSingleProduct/:id", updateSingleProduct);


export default router