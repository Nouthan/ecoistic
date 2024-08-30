const express = require("express");
const {
  createGoal,
  getGoalOfUser,
  getAllTasks,
  getAllCommunities,
  createCommunity,
  addUserToCommunity,
  getUserGoals,
  updateTask,
  getUserReward,
} = require("../controllers/taskController.js");
const protectRoute = require("../middleware/authMiddleware.js");

const router = express.Router();

router.post("/create/goal", protectRoute, createGoal);
router.get("/goal", protectRoute, getGoalOfUser);
router.get("/tasks", protectRoute, getAllTasks);
router.post("/create/community", protectRoute, createCommunity);
router.get("/all-communities", getAllCommunities);
router.put("/add-to-community", protectRoute, addUserToCommunity);
router.get("/goals", protectRoute, getUserGoals);
router.put("/update-task", protectRoute, updateTask);
router.get("/all-rewards", protectRoute, getUserReward);
module.exports = router;
