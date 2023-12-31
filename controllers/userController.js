const User = require('../models/User');

const userController = {
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId)
        .populate('thoughts')
        .populate('friends');
      res.json(user);
    } catch (err) {
      res.status(404).json({ message: 'User not found' });
    }
  },

  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.userId,
        req.body,
        { new: true, runValidators: true }
      );
      res.json(updatedUser);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.userId);
      res.json({ message: 'User deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addFriend: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $push: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!user) {
        res.status(404).json({ "message": "No user found with that id" });
      }
      res.json({ "message": "Friend added!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  removeFriend: async (req, res) => {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );
      if (!user) {
        return res.status(404).json({ "message": "No user found with that id" });
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};





module.exports = userController;
