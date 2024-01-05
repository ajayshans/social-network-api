const { Schema, model } = require('mongoose');

// Schema to create Student model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            // Trims any whitespace
            trim: true
        },
        email: {
            type: String,
            unique: true,
            required: true,
            // Email validation regex pattern
            match: [/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/, 'Please enter a valid email address']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'user'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Creating virtual called 'friendCount' which retrieves the length of the user's 'friends' array field on query
userSchema
    .virtual('friendCount')
    // Getter
    .get(function () {
        return this.friends.length;
    });

// Initialise User model
const User = model('user', userSchema);

module.exports= User;