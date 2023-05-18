const names = [
  'Alice',
  'Bob',
  'Charlie',
  'David',
  'Eve',
  'Frank',
  'Grace',
  'Henry',
  'Ivy',
  'Jack'
];

const thoughts = [
  {
    thoughtText: 'This is a great thought!',
    username: 'Alice'
  },
  {
    thoughtText: 'I love coding!',
    username: 'Bob'
  },
  {
    thoughtText: 'Nature is so beautiful.',
    username: 'Charlie'
  },
  {
    thoughtText: 'Music makes me feel alive.',
    username: 'David'
  },
  {
    thoughtText: 'Spending time with loved ones is precious.',
    username: 'Eve'
  }
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Function to generate random thoughts
const getRandomThoughts = (int) => {
  const results = [];
  for (let i = 0; i < int; i++) {
    const thought = getRandomArrItem(thoughts);
    results.push({
      thoughtText: thought.thoughtText,
      username: thought.username
    });
  }
  return results;
};

module.exports = {
  getRandomName,
  getRandomThoughts
};
