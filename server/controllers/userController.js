const User = require("../models/user.js");
const { createJWT } = require("../utils/index.js");

const registerUser = async (req, res) => {
  try {
    const { name, surname, email, password } = req.body;
    const userExist = await User.findOne({email});
    if (userExist) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
      });
    }
    const user = await User.create({
      name,
      surname,
      email,
      password,
    });
    if (user) {
      const newUser = await User.findById(user._id).select("-password");
      return res.status(200).json(newUser);
    } else {
      return res.status(400).json({
        status: false,
        message: "Invalid user data",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ status: false, message: "Invalid Email or Password." });
    }
    const isMatch = await user.matchPassword(password);
    if (user && isMatch) {
      createJWT(res, user._id);
      const newUser = await User.findById(user._id).select("-password");
      res.status(200).json(newUser);
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};
const logoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return res.status(200).json({ message: "Logout Sucessful" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ status: false, message: error.message });
  }
};
const getAllUser = async (req, res) => {
  try {
    const users = await User.find().select("name surname coins");
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ status: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser, logoutUser , getAllUser};
