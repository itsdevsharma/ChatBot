import { User } from "../models/users.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    
    const { userName, email, password } = req.body;

    // Validate required fields
    if (!userName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }


    const user = await User.create({
      userName,
      email,
      password,
    });

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error); // Log error for debugging
    res.status(500).json({ message: "Error registering user", error: error.message });
  }
});

export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password stored in the DB
    const validPassword = await bcrypt.compare(password, user.password);
    
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Create JWT token with user id and optional claims
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d', // Set the token expiration (7 days)
    });

    // Remove password field from user object before sending it to the client
    user.password = undefined;

    // Send success response with the JWT token and user data (without password)
    res.json({
      message: "Login successful",
      token,
      user,
    });
  } catch (error) {
    console.error(error);  // Log error for debugging
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
});

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
