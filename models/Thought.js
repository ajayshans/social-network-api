const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const formatDate = require('../utils/date')

// Schema to create Thought model
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1,
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: formatDate
        },
        username: {
            type: String,
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        // Settings to convert mongoose document to JSON representation
        toJSON: {
            // Includes virtual properties in the JSON representation
            virtuals: true,
            // Allows for formatting of createdAt timestamp + reference of reactionSchema
            // Ensures getters are applied to the JSON representation
            getters: true
        },
        // Excludes id from the JSON representation
        id: false
    }
);

// Creating virtual called 'reactionCount' which retrieves the length of the thought's 'reactions' array field on query
userSchema
    .virtual('reactionCount')
    // Getter
    .get(function () {
        return this.reactions.length;
    });

// Initialise User model
const Thought = model('thought', thoughtSchema);

module.exports= Thought;