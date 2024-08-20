const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Helper function to sign JWT token
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Register User
const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isDeleted: false, // Ensure default value for isDeleted
    });

    // Generate JWT token
    const token = signToken(user._id);

    // Set the JWT token as a cookie
    res.cookie("token", token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    // Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email, isDeleted: false });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Check if password is correct
    const isCorrectPassword = await bcrypt.compare(password, user.password);
    if (!isCorrectPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = signToken(user._id);

    // Set the JWT token as a cookie
    res.cookie("token", token, {
      // httpOnly: true,
      secure: process.env.NODE_ENV === "production", // HTTPS only in production
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = { register, login, logout };
