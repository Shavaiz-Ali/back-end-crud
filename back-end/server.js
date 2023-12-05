import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
const app = express();
const PORT = 8888
import bodyParser from  'body-parser';
import connectDb from "./config/connectDb.js";
import adminRoute from "./routes/index.route.js";
import productRoute from "./routes/product.route.js"
dotenv.config()
// parse application/x-www-form-urlencoded
// parse application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


connectDb();
app.use("/", adminRoute);
app.use("/api", productRoute);
app.listen(PORT, () => {
    console.log("port is runnig on" , PORT)
});