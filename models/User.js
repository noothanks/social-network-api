const {Schema, model, Types} = require('mongoose');

//create user schema
const userSchema = new Schema(
    {
        //should be a unique string with no white-space
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        //should be a unique string that matches the regex pattern
        email: {
            type: String,
            unique: true,
            required: true,
            match: [
                /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
                "Please enter a valid email address"
            ]
        },
        //associates a user with the thoughts they have posted
        thoughts: [
            //tells mongoose to expect an object from the Thought model
            {
                type: Schema.Types.ObjectId,
                ref: "Thought"
            }
        ],
        //associates a user with their friends
        friends: [
            //tells mongoose to expect a User object
            {
                type: Schema.Type.ObjectId,
                ref: 'User'
            }
        ],
        //allows for the creation of virtual fields in our documents
        //allows for the use of our helper functions
        toJSON: {
            virtuals: true,
            getters: true
        },
        //prevents duplicate ids
        id: false
    }
);

//virtuals add virtual properties to document that are not stored in the database
//normally computed values that are evaluated on call
//allows for more info on a db response without manually adding more to api response
//will retrieve the user's total friend count
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

const User = model('User', userSchema);

module.exports = User;