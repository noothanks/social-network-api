const { User, Thought } = require("../models");

const thoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'replies',
                select: '-__v'
            })
            .select('-__v')
            .sort({_id: -1})
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'Currently no thoughts to display'})
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
              });
    },
    getSingleThought({params}, res) {
        Thought.findOne(
            {
                _id: params.id
            }
        )
        .populate({
            path: 'replies',
            select: '-__v'
        })
        .select('-__v')
        .then(dbThoughtData => {
            if(!dbThoughtData) {
                res.status(404).json({message: 'No thought found with this id'})
                return;
            }
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
    },
    createThought({params, body}, res) {
        Thought.create(body)
            .then(({_id}) => {
                return User.findOneAndUpdate(
                    {
                        _id: params.id
                    },
                    {
                        $push: {thoughts: _id}
                    },
                    {
                        new: true
                    }
                )
            })
            .then(dbThoughtData => {
                if(!dbThoughtData){
                    res.status(404).json({message: 'Please enter a valid Thought'})
                    return;
                }
                res.json(dbThoughtData);
            })
    },
    updateThought({params, body}, res) {
        Thought.findOneAndUpdate(
            {
                _id: params.thoughtId
            }, body, {
                new: true,
                runValidators: true
            }
        )
        .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
        .catch(err => res.json(err));
    },
    deleteThought({params}, res){
        Thought.findOAndDelete(
            {
                _id: params.id
            }
        )
        .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
        .catch(err => res.json(err));
    },
    createReply({params, body}, res) {
        Thought.findOneAndUpdate(
            {
                _id: params.thoughtId
            },
            {
                $push: {replies: body}
            },
            {
                new: true,
                runValidators: true
            }
        )
        .then(dbReplyData => {
            if(!dbReplyData) {
                res.status(404).json({message: 'Please enter a valid Reaction'})
                return;
            }
            res.json(dbReplyData)
        })
        .catch(err => res.json(err));
    },
    deleteReply({params}, res) {
        Thought.findOneAndUpdate(
            {
                _id: params.thoughtId
            },
            {
                $pull: {reactions: {replyId: params.replyId}}
            },
            {
                new: true,
                runValidators: true
            }
        )
        .then((thoughtData) => {
            if (!thoughtData) {
              res.status(404).json({ message: "Incorrect reaction data!" });
              return;
            }
            res.json(dbUserData);
          })
        .catch((err) => res.json(err));
    }
}

module.exports = thoughtController;