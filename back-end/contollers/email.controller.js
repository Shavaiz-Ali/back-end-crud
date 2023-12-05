import User from "../models/email.model.js";
import bcrypt from "bcrypt";

// user register API
export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation checks
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "Please provide all required information." });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(401).json({ success: false, message: "User already exists." });
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ name, email, password: hashPassword });
        await newUser.save();
        res.status(201).json({ success: true, message: "User registered successfully", newUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// user login API
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Please provide both email and password." });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            return res.status(401).json({ success: false, message: "Incorrect password" });
        }

        res.status(200).json({ success: true, message: "User logged in successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// get all users API
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();

        if (!users || users.length === 0) {
            return res.status(404).json({ success: false, message: "No users found" });
        }

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// get single user API
export const getSingleUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        res.status(200).json({ success: true, message: "User found successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

// update single user
export const updateSingleUser = async (req, res) => {
    try {
        const { id } = req.params;
        const payload = req.body;

        if (!payload || Object.keys(payload).length === 0) {
            return res.status(400).json({ success: false, message: "Please provide valid update data." });
        }

        const user = await User.findByIdAndUpdate(id, payload, { new: true });

        if (!user) {
            return res.status(404).json({ success: false, message: "No user found to update" });
        }

        res.status(200).json({ success: true, message: "User updated successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// delete a single user
export const deleteSingleUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({ success: false, message: "No user found to delete" });
        }

        res.status(200).json({ success: true, message: "User deleted successfully", user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}
