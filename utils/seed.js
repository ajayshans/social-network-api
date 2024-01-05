const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomThoughts, getThoughtReactions, getRandomArrItem, getRandomUsername } = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
    // Delete the collections if they exist
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await connection.dropCollection('thoughts');
    }

    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await connection.dropCollection('users');
    }

    // Add user data
    const users = [];
    for (let i = 0; i < 5; i++) {
        const username = getRandomUsername();
        const email = `${username}@email.com`;
        users.push({
            username,
            email,
        });
    }
    console.table(users);

    await User.collection.insertMany(users);

    // Create the reactions that will be added to each thought
    const getReactions = (int) => {
        const results = [];
        for (let i = 0; i < int; i++) {
            results.push({
                reactionBody: getThoughtReactions(),
                username: getRandomArrItem(users).username,
            });
        }
        return results;
    };

    // Create thoughts
    const genThoughts = (int) => {
        let results = [];
        for (let i = 0; i < int; i++) {
            let user = getRandomArrItem(users);
            results.push({
                thoughtText: getRandomThoughts(),
                username: user.username,
                reactions: [...getReactions(3)]
            });
        }
        return results;
    }

    // Create 5 thoughts
    const thoughts = genThoughts(5);

    // Insert thought data to database
    await Thought.collection.insertMany(thoughts);

    // Log tables for users and thoughts
    console.table(users);
    console.table(thoughts);
    console.timeEnd('seeding');
    process.exit(0);
});