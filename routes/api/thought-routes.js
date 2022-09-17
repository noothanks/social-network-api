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
    
router.route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought)

router.route('/:thoughtId/replies')
    .post(createReply)
    .delete(deleteReply)

module.exports = router