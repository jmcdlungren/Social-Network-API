const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [{
      type: Schema.Types.ObjectId,
      ref: 'User'
    }],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true, // Enable virtual properties in the JSON representation
    },
    id: false, // Disable the default 'id' virtual property
  }
);

// Define the virtual property 'friendCount'
userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
