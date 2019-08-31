const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  userids: {
    type: [String],
    required: true
  },
  messages: [
    {
      ownerid: {
        type: String,
        required: true
      },
      content: {
        type: String,
        required: true
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    }
  ]
});

const Chat = mongoose.model('Chat', chatSchema);

module.exports = Chat;
