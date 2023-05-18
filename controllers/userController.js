const { User, Thought } = require('../models');

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
      .populate('thoughts')
      .populate('friends')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single user by its _id and populated thought and friend data
  getUserById(req, res) {
    const { id } = req.params;
    User.findById(id)
      .populate('thoughts')
      .populate('friends')
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  // POST a new user
  createUser(req, res) {
    const { username, email } = req.body;
    User.create({ username, email })
      .then((user) => res.status(201).json(user))
      .catch((err) => res.status(400).json(err));
  },

  // PUT to update a user by its _id
  updateUser(req, res) {
    const { id } = req.params;
    User.findByIdAndUpdate(id, req.body, { new: true })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to remove user by its _id
  deleteUser(req, res) {
    const { id } = req.params;
    User.findByIdAndDelete(id)
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        // Remove a user's associated thoughts when deleted
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => res.json({ message: 'User and associated thoughts deleted' }))
      .catch((err) => res.status(400).json(err));
  },

  // POST to add a new friend to a user's friend list
  addFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(
      userId,
      { $addToSet: { friends: friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to remove a friend from a user's friend list
  removeFriend(req, res) {
    const { userId, friendId } = req.params;
    User.findByIdAndUpdate(
      userId,
      { $pull: { friends: friendId } },
      { new: true }
    )
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = userController;
