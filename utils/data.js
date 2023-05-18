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
    username: 'Alice',
    reactions: [
      {
        reactionId: 1,
        reactionBody: 'I agree!',
        username: 'Bob',
        createdAt: new Date()
      },
      {
        reactionId: 2,
        reactionBody: 'That\'s interesting.',
        username: 'Charlie',
        createdAt: new Date()
      }
    ]
  },
  {
    thoughtText: 'I love coding!',
    username: 'Bob',
    reactions: [
      {
        reactionId: 3,
        reactionBody: 'Me too!',
        username: 'Alice',
        createdAt: new Date()
      },
      {
        reactionId: 4,
        reactionBody: 'Coding is fun.',
        username: 'Charlie',
        createdAt: new Date()
      }
    ]
  },
  {
    thoughtText: 'Nature is so beautiful.',
    username: 'Charlie',
    reactions: [
      {
        reactionId: 5,
        reactionBody: 'Absolutely!',
        username: 'Alice',
        createdAt: new Date()
      },
      {
        reactionId: 6,
        reactionBody: 'I love spending time in nature.',
        username: 'Bob',
        createdAt: new Date()
      }
    ]
  },
  {
    thoughtText: 'Music makes me feel alive.',
    username: 'David',
    reactions: [
      {
        reactionId: 7,
        reactionBody: 'Music is my passion too!',
        username: 'Alice',
        createdAt: new Date()
      },
      {
        reactionId: 8,
        reactionBody: 'What\'s your favorite genre?',
        username: 'Charlie',
        createdAt: new Date()
      }
    ]
  },
  {
    thoughtText: 'Spending time with loved ones is precious.',
    username: 'Eve',
    reactions: [
      {
        reactionId: 9,
        reactionBody: 'Couldn\'t agree more!',
        username: 'Alice',
        createdAt: new Date()
      },
      {
        reactionId: 10,
        reactionBody: 'Family is everything.',
        username: 'Bob',
        createdAt: new Date()
      }
    ]
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
