const { User, Thought } = require("../models");

const userController = {
    getAllUsers(req, res){
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
              console.log(err);
              res.sendStatus(400);
            });
    },
    getSingleUser({params}, res) {
        User.findOne(
            {
                _id: params.id
            }
        )
        .populate({
            path: 'thoughts',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    createUser({body}, res){
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
    updateUser({params, body}, res) {
        User.findOneAndUpdate(
            {
                _id: params.id
            }, body, {
                new: true,
                runValidators: true
            }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user with this id'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    deleteUser({params}, res) {
        User.findOneAndDelete({_id: params.id})
            .then(dbUserData => {
                if(!dbUserData) {
                    res.status(404).json({message: 'No user with this id'})
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err))
    },
    addFriend({params, body}, res) {
        User.findOneAndUpdate(
            {
                _id: params.userId
            },
            {
                $push: {friends: body.friendId}
            },
            {
                new: true,
                runValidators: true
            }
        )
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user with this id'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },
    deleteFriend({params, body}, res) {
        User.findOneAndUpdate(
            {
                _id: params.userId
            },
            {
                $pull: {friends: body.friendId}
            },
            {
                new: true
            }
        )
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No user with this id'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err))
    }
}

module.exports = userController;