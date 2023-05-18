const { getRandomName, getRandomThoughts } = require('./data');
const { User, Thought } = require('../models');
const connection = require('../config/connection');

// Function to seed users
const seedUsers = async () => {
  try {
    // Clear existing users
    await User.deleteMany();

    // Generate and save new users
    const users = [];
    for (let i = 0; i < 5; i++) {
      const username = getRandomName();
      const email = `${username.toLowerCase().replace(' ', '')}@example.com`;

      const user = await User.create({ username, email });
      users.push(user);
    }

    console.log('Users seeded successfully:', users);
  } catch (err) {
    console.error('Error seeding users:', err);
  }
};

// Function to seed thoughts
const seedThoughts = async () => {
  try {
    // Clear existing thoughts
    await Thought.deleteMany();

    // Generate and save new thoughts
    const thoughts = getRandomThoughts(10);
    const createdThoughts = await Thought.create(thoughts);

    console.log('Thoughts seeded successfully:', createdThoughts);
  } catch (err) {
    console.error('Error seeding thoughts:', err);
  }
};

// Event listener for database connection error
connection.on('error', (err) => {
  console.error('Database connection error:', err);
});

// Event listener for successful database connection
connection.once('open', async () => {
  try {
    await seedUsers();
    await seedThoughts();
    console.log('Database seeded successfully');
    connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
    connection.close();
  }
});
