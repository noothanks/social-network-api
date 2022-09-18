const router = require("express").Router();

const {
    getAllUsers,
    createUser,
    getSingleUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
  } = require("../../controllers/user-controller");

// /api/users
router.route('/')
  .get(getAllUsers)
  .post(createUser);

// /api/users/:id
router.route('/:id')
  .get(getSingleUser)
  .put(updateUser)
  .delete(deleteUser);

// /api/users/:id/friends/:friendId
router.route('/:userId/friends/')
  .post(addFriend)
  .delete(deleteFriend);


module.exports = router;