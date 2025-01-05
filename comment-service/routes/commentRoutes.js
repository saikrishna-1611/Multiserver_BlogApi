const express = require('express');
const { addComment, getCommentsByPost } = require('../controllers/commentController');
const router = express.Router();

router.post('/', addComment);
router.get('/', getCommentsByPost);

module.exports = router;