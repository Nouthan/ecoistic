const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getAllUser,
} = require("../controllers/userController.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/all-users", getAllUser);

module.exports = router;
