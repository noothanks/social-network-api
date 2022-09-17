const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const replySchema = new Schema(
    {   
        //set custom id name to avoid confusion with thought
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId
        },
        replyBody: {
            type: String,
            required: true,
            maxLength: 280
        },
        writtenBy: {
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
        writtenBy: {
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

thoughtSchema.virtual('reactionTotal').get(function() {
    return this.replies.length
})

const Thought = model('Thought', thoughtSchema)

module.exports = Thought