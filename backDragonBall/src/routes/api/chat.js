const express = require('express');
const router = express.Router();
const chatController = require('../../controllers/chatController');

router.get('/ask', chatController.askQuestion);

module.exports = router;