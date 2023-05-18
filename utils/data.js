const { ObjectId } = require('mongoose').Types;

const thoughts = [
  {
    thoughtText: 'This is a great thought!',
    username: 'Alice',
    reactions: [
      {
        reactionId: new ObjectId(),
        reactionBody: 'I agree!',
        username: 'Bob',
        createdAt: new Date()
      },
      {
        reactionId: new ObjectId(),
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
        reactionId: new ObjectId(),
        reactionBody: 'Me too!',
        username: 'Alice',
        createdAt: new Date()
      },
      {
        reactionId: new ObjectId(),
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
        reactionId: new ObjectId(),
        reactionBody: 'Absolutely!',
        username: 'Alice',
        createdAt: new Date()
      },
      {
        reactionId: new ObjectId(),
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
        reactionId: new ObjectId(),
        reactionBody: 'Music is my passion too!',
        username: 'Alice',
        createdAt: new Date()
      },
      {
        reactionId: new ObjectId(),
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
        reactionId: new ObjectId(),
        reactionBody: 'Couldn\'t agree more!',
        username: 'Alice',
        createdAt: new Date()
      },
      {
        reactionId: new ObjectId(),
        reactionBody: 'Family is everything.',
        username: 'Bob',
        createdAt: new Date()
      }
    ]
  }
];

const users = [
  {
    username: 'Alice',
    email: 'alice@example.com',
    friends: []
  },
  {
    username: 'Bob',
    email: 'bob@example.com',
    friends: []
  },
  {
    username: 'Charlie',
    email: 'charlie@example.com',
    friends: []
  },
  {
    username: 'David',
    email: 'david@example.com',
    friends: []
  },
  {
    username: 'Eve',
    email: 'eve@example.com',
    friends: []
  },
  {
    username: 'Frank',
    email: 'frank@example.com',
    friends: []
  },
  {
    username: 'Grace',
    email: 'grace@example.com',
    friends: []
  },
  {
    username: 'Henry',
    email: 'henry@example.com',
    friends: []
  },
  {
    username: 'Ivy',
    email: 'ivy@example.com',
    friends: []
  },
  {
    username: 'Jack',
    email: 'jack@example.com',
    friends: []
  }
];

module.exports = { users, thoughts };
