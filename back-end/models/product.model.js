import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { 
        type: String,
        required: true 
    },
    description: {
         type: String,
         required: false
     },
    price: {
         type: Number,
         required: true 
    },
    category: {
         type: String,
         required: true 
    },
    imageUrl: { 
        type: String,
         required: false 
    }
});

export default mongoose.model("productModel", productSchema)