const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const protectRoute = async (req, res, next) => {
  try {
    let token = req.cookies?.token;
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decodedToken.userId).select("email"); // Only select email

      if (!user) {
        return res
          .status(401)
          .json({ status: false, message: "User not found" });
      }

      req.user = {
        email: user.email,
        userId: decodedToken.userId,
      };
      next();
    } else {
      return res
        .status(401)
        .json({ status: false, message: "Not authorized. Try login again" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ status: false, message: "Server issue" });
  }
};

module.exports = protectRoute;
