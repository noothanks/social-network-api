const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const replySchema = new Schema(
    {   
        //set custom id name to avoid confusion with thought
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            //formats into a more readable date
            get: (dateVal => dateFormat(dateVal))
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
)


const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxLength: 280
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (dateVal => dateFormat(dateVal))
        },
        replies: [replySchema] 
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
)

const Thought = model('Thought', thoughtSchema)

module.exports = Thought