const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  // GET a single thought by its _id
  getThoughtById(req, res) {
    const { thoughtId } = req.params;
    Thought.findById(thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  // POST to create a new thought
  createThought(req, res) {
    const { thoughtText, username, userId } = req.body;
    Thought.create({ thoughtText, username })
      .then((thought) => {
        return User.findByIdAndUpdate(
          userId,
          { $push: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) => {
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(201).json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // PUT to update a thought by its _id
  updateThought(req, res) {
    const { thoughtId } = req.params;
    Thought.findByIdAndUpdate(thoughtId, req.body, { new: true })
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to remove a thought by its _id
  deleteThought(req, res) {
    const { thoughtId } = req.params;
    Thought.findByIdAndDelete(thoughtId)
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        return User.findByIdAndUpdate(
          thought.username,
          { $pull: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then(() => res.json({ message: 'Thought deleted' }))
      .catch((err) => res.status(400).json(err));
  },

  // POST to create a reaction stored in a single thought's reactions array field
  createReaction(req, res) {
    const { thoughtId } = req.params;
    const { reactionBody, username } = req.body;
    Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.status(201).json(thought);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE to pull and remove a reaction by the reaction's reactionId value
  deleteReaction(req, res) {
    const { thoughtId, reactionId } = req.params;
    Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(thought);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = thoughtController;
