const usernames = [
    "jamo47",
    "lucylikesapples",
    "hellostranger23",
    "hitchikersteve32",
    "migueljagson"
  ]
  
  const thoughts = [
    "I could really use a pineapple right now.",
    "I wonder if dolphins have feelings.",
    "Why can't we just talk about the political and economic state of the world right now?",
    "I'm not like other girls.",
    "I'm not like other boys."
  ];
  
  const reactions = [
    'Love it!',
    'Amazing stuff!!',
    'This one really gets you thinking!',
    'I was hoping I would be more excited reading this',
    'Boo your team is going to lose!',
  ];
  
  // Get a random item given an array
  const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  
  // Gets a random username
  const getRandomUsername = () =>
    `${getRandomArrItem(usernames)}_${getRandomArrItem(usernames)}`;
  
  // Gets a random thought
  const getRandomThoughts = () => getRandomArrItem(thoughts);
  
  // Gets a random reaction
  const getThoughtReactions = () => getRandomArrItem(reactions);
  
  
  // Export the functions for use in seed.js
  module.exports = { getRandomArrItem, getRandomUsername, getRandomThoughts, getThoughtReactions };