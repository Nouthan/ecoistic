const Goal = require("../models/goal.js");
const Community = require("../models/community.js");
const User = require("../models/user.js");
const Reward = require("../models/reward.js");

const createGoal = async (req, res) => {
  try {
    const user = req.user;
    const goalData = req.body;

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not authenticated",
      });
    }

    const newGoal = new Goal({ ...goalData, user: user.userId });
    await newGoal.save();

    res.status(201).json({
      status: true,
      goal: newGoal,
    });
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
const getGoalOfUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const goals = await Goal.find({ user: userId }).exec();
    res.status(200).json({
      status: true,
      goals,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const { userId } = req.user;
    const goals = await Goal.find({ user: userId }).exec();
    const communities = await Community.find({ members: userId }).exec();

    const goalTasks = goals.map((goal) => ({
      id: goal._id,
      name: goal.name,
      data: `Target: ${goal.appliance}`,
      status: goal.status,
      reward: `${goal.coins} Coins`,
      type: "Goal",
    }));

    const communityTasks = communities.map((community) => ({
      id: community._id,
      name: community.name,
      data: `Members: ${community.members.length}`,
      status: community.status,
      reward: `${community.coins} Coins`,
      type: "Community",
    }));

    const tasks = [...goalTasks, ...communityTasks];

    res.status(200).json({
      status: true,
      tasks,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
const createCommunity = async (req, res) => {
  try {
    const user = req.user;
    const communityData = req.body;

    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not authenticated",
      });
    }

    const newCommunity = new Community({
      ...communityData,
      members: [user.userId],
    });
    await newCommunity.save();

    res.status(201).json({
      status: true,
      community: newCommunity,
    });
  } catch (error) {
    console.error("Error creating community:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
const getCommunitiesOfUser = async (req, res) => {
  try {
    const { userId } = req.user;
    const communities = await Community.find({ members: userId }).exec();
    res.status(200).json({
      status: true,
      communities,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find().exec();

    const formattedCommunities = communities.map((community) => ({
      id: community._id,
      name: community.name,
      target: community.target,
      members: community.members.length,
      reward: community.coins,
      status: community.status,
    }));

    res.status(200).json({
      status: true,
      formattedCommunities,
    });
  } catch (error) {
    return res.status(500).json({ status: false, message: error.message });
  }
};
const addUserToCommunity = async (req, res) => {
  try {
    const { userId } = req.user;
    const { communityId } = req.body;

    const community = await Community.findById(communityId);
    if (!community) {
      return res.status(404).json({
        status: false,
        message: "Community not found",
      });
    }
    if (community.members.includes(userId)) {
      return res.status(400).json({
        status: false,
        message: "User already a member of the community",
      });
    }
    community.members.push(userId);
    await community.save();

    res.status(200).json({
      status: true,
      message: "User added to community",
      community,
    });
  } catch (error) {
    console.error("Error adding user to community:", error);
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};
const getUserGoals = async (req, res) => {
  try {
    const { userId } = req.user;
    const completedGoalsCount = await Goal.countDocuments({
      user: userId,
      status: "Completed",
    });
    const pendingGoalsCount = await Goal.countDocuments({
      user: userId,
      status: "Pending",
    });
    const goalData = { completedGoalsCount, pendingGoalsCount };
    res.status(200).json(goalData);
  } catch (error) {
    res.status(500).json({ message: "Failed to track goals", error });
  }
};
const updateTask = async (req, res) => {
  try {
    const { userId } = req.user;
    const { itemId, itemType } = req.body;

    if (!userId || !itemId || !itemType) {
      return res.status(400).send("Missing required fields");
    }
    let item;
    let reward;

    if (itemType === "Community") {
      item = await Community.findById(itemId);
      if (!item) {
        throw new Error("Community not found");
      }
      reward = {
        name: item.name,
        description: "Completion reward for community",
        amount: item.coins,
        user: userId,
        associatedWith: "Community",
      };
    } else if (itemType === "Goal") {
      item = await Goal.findById(itemId);
      if (!item) {
        throw new Error("Goal not found");
      }
      reward = {
        name: item.name,
        description: "Completion reward for goal",
        amount: item.coins,
        user: userId,
        associatedWith: "Goal",
      };
    } else {
      throw new Error("Invalid item type");
    }

    item.status = "Completed";
    await item.save();

    const user = await User.findById(userId);
    if (user) {
      user.coins += reward.amount;
      const newReward = new Reward(reward);
      await newReward.save();

      user.rewards.push(newReward._id);
      await user.save();
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    res.status(500).send(`Error completing ${itemType}: ${error.message}`);
  }
};
const getUserReward = async (req, res) => {
  try {
    const { userId } = req.user;
    const rewards = await Reward.find({ user: userId });
    const formattedRewards = rewards.map(reward => ({
      id: reward.user,
      name: reward.name,
      type: reward.associatedWith,
      reward: `${reward.amount} Coins`,
    }));
    res.json(formattedRewards);
  } catch (error) {
    console.error("Error fetching user rewards:", error);
    res.status(500).json({ message: "Error fetching user rewards" });
  }
};

module.exports = {
  createGoal,
  getGoalOfUser,
  getAllTasks,
  getAllCommunities,
  createCommunity,
  addUserToCommunity,
  getUserGoals,
  updateTask,
  getUserReward,
};
