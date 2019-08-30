const express = require('express');
const router = express.Router();
const auth = require('../../utils/auth');
const { check, validationResult } = require('express-validator');

const Chat = require('../../models/Chat');

// @route    GET api/chats/open/:otherUserId
// @desc     Open Chat
// @access   Private
router.get('/open/:otherUserId', auth, async (req, res) => {
  const currentUserId = req.user.id;
  const otherUserId = req.params.otherUserId;

  try {
    let chat = await Chat.findOne({
      // find the chat where userids contains both currentUser and otherUser ids
      userids: { $all: [currentUserId, otherUserId] }
    });

    if (!chat) {
      // chat already NOT there
      chat = new Chat({
        userids: [currentUserId, otherUserId],
        messages: []
      });

      await chat.save();
    }

    res.json({ chat });
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ msg: err.message });
  }
});

// @route    POST api/chats/message/:otherUserId
// @desc     Create message
// @access   Private
router.post('/message/:otherUserId', auth, async (req, res) => {
  const currentUserId = req.user.id;
  const otherUserId = req.params.otherUserId;

  try {
    let chat = await Chat.findOne({
      // find the chat where userids contains both currentUser and otherUser ids
      userids: { $all: [currentUserId, otherUserId] }
    });

    const message = {
      ownerid: currentUserId,
      content: req.body.message
    };

    chat.messages.push(message);

    await chat.save();

    res.json({ chat });
  } catch (err) {
    console.error(err.message);
    res.status(400).send({ msg: err.message });
  }
});

module.exports = router;
