const Thought = require('../models/Thought');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find().populate('reactions');
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
      res.json(thought);
    } catch (err) {
      res.status(404).json({ message: 'Thought not found' });
    }
  },

  createThought: async (req, res) => {
    try {
      const newThought = await Thought.create(req.body);
      res.json(newThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        req.body,
        { new: true, runValidators: true }
      );
      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  deleteThought: async (req, res) => {
    try {
      await Thought.findByIdAndDelete(req.params.thoughtId);
      res.json({ message: 'Thought deleted' });
    } catch (err) {
      res.status(500).json(err);
    }
  },

  addReaction: async (req, res) => {
    try {
      const { reactionBody, username } = req.body;
      const thoughtId = req.params.thoughtId;

      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        {
          $push: {
            reactions: { reactionBody, username, createdAt: new Date() },
          },
        },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },

  removeReaction: async (req, res) => {
    try {
      const thoughtId = req.params.thoughtId;
      const reactionId = req.params.reactionId;

      const updatedThought = await Thought.findByIdAndUpdate(
        thoughtId,
        {
          $pull: {
            reactions: { _id: reactionId },
          },
        },
        { new: true }
      );

      if (!updatedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      res.json(updatedThought);
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = thoughtController;
