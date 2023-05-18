const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const userCount = async () => {
  const numberOfUsers = await User.aggregate().count('userCount');
  return numberOfUsers;
};

// Aggregate function for getting the overall thought rating using $avg
const thoughtRating = async (userId) =>
  User.aggregate([
    // only include the given user by using $match
    { $match: { _id: new ObjectId(userId) } },
    {
      $unwind: '$thoughts',
    },
    {
      $group: {
        _id: new ObjectId(userId),
        overallRating: { $avg: '$thoughts.rating' },
      },
    },
  ]);

module.exports = {
  // Get all users
  async getAllUsers(req, res) {
    try {
      const users = await User.find();

      const userObj = {
        users,
        userCount: await userCount(),
      };

      res.json(userObj);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Get a single user
  async getUserById(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
        .populate('thoughts')
        .populate('friends')
        .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json({
        user,
        thoughtRating: await thoughtRating(req.params.id),
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },

  // Create a new user
  async createUser(req, res) {
    try {
      const { username, email } = req.body;
      const user = await User.create({ username, email });
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Update a user
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Delete a user
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const deletedUser = await User.findByIdAndDelete(id);

      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      // Remove a user's associated thoughts when deleted
      await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });

      res.json({ message: 'User and associated thoughts deleted' });
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Add a friend to a user's friend list
  async addFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $addToSet: { friends: friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },

  // Remove a friend from a user's friend list
  async removeFriend(req, res) {
    try {
      const { userId, friendId } = req.params;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $pull: { friends: friendId } },
        { new: true }
      );

      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.json(updatedUser);
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  },
};
