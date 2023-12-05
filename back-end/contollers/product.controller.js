import Product from "../models/product.model.js";

export const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, imageUrl } = req.body;
        if (!name || !price || !description || !category || !imageUrl) {
            return res.status(400).json({ success: false, msg: 'Please fill all fields' });
        }
        const newProduct = new Product({ name, description, price, category, imageUrl });
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        if (products.length === 0) {
            return res.status(404).json({ success: false, msg: "No products found" });
        }
        res.status(200).json({ success: true, data: products });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const getSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, msg: "Product not found" });
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const deleteSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ success: false, msg: "Product not found for deletion" });
        }
        res.status(200).json({ success: true, data: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};

export const updateSingleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ success: false, msg: "Product not found for update" });
        }
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
};
