const router = require("express").Router();

const {
  getAllThoughts,
  createThought,
  getSingleThought,
  updateThought,
  deleteThought,
  createReply,
  deleteReply,
} = require("../../controllers/thought-controller");

// /api/thoughts
router.route('/')
    .get(getAllThoughts)
    .post(createThought)
    
router.route('/:id')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:id/replies')
    .post(createReply)

router.route('/:id/replies/:replyId')
    .delete(deleteReply)

module.exports = router