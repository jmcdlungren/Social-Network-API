const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data');

connection.on('error', console.error.bind(console, 'connection error:'));
connection.once('open', async () => {
  console.log('Connected to MongoDB database.');

  try {
    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Create users
    const createdUsers = await User.create(users);

    // Populate friends
    for (const user of createdUsers) {
      const { username, friends } = users.find((u) => u.username === user.username);
      const friendObjects = [];

      for (const friendUsername of friends) {
        const friendUser = createdUsers.find((u) => u.username === friendUsername);
        friendObjects.push(friendUser._id);
      }

      user.friends = friendObjects;
      await user.save();
    }

    // Map created users to add the generated user IDs to the thoughts
    const thoughtsWithUsers = thoughts.map((thought) => {
      const user = createdUsers.find((u) => u.username === thought.username);
      return {
        ...thought,
        username: user._id
      };
    });

    // Create thoughts
    await Thought.create(thoughtsWithUsers);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
});
