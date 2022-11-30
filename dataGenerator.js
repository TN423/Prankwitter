/*
 * NOTE: This file creates bots and generates tweets
 */

// set up data structures
window.streams = {};
streams.home = [];
streams.users = {};
streams.specialUsers = {};
streams.users.Prankster_Calvin = [];
streams.users.Prankster_Bear = [];
streams.users.Prankster_SnoopDog = [];
streams.users.Prankster_Garfield = [];
streams.users.Prankster_Justin = [];

window.users = Object.keys(streams.users);

// helper function for adding tweets to our data structures
var addTweet = function(newTweet) {
  var username = newTweet.user;
  streams.users[username].push(newTweet);
  streams.home.push(newTweet);
};

// helper function for generating tweets
var randomElement = function(array) {
  var randomIndex = Math.floor(Math.random() * (array.length-1));
  return array[randomIndex];
};

// random tweet generator
var opening = ['Just', 'My dude', 'The bearded man', 'The turd', 'The big baller', 'Ask me how I', 'Completely', 'Nearly', 'Productively', 'Efficiently', 'Last night I', 'The president', 'That wizard', 'A ninja', 'A seedy old man'];
var verbs = ['downloaded', 'interfaced', 'deployed', 'developed', 'built', 'invented', 'experienced', 'navigated', 'aided', 'enjoyed', 'engineered', 'installed', 'debugged', 'delegated', 'automated', 'formulated', 'systematized', 'overhauled', 'computed'];
var objects = ['my', 'your', 'the', 'a', 'my', 'an entire', 'this', 'that', 'the', 'the big', 'a new form of'];
var nouns = ['cat', 'koolaid', 'system', 'city', 'worm', 'cloud', 'potato', 'money', 'way of life', 'belief system', 'security system', 'bad decision', 'future', 'life', 'pony', 'mind'];
var tags = ['#techlife', '#burningman', '#CaptainKirk', 'but only I know how', 'for real', '#sxsw', '#ballin', '#omg', '#StarTrek', '#magic', '#plumbing', '#Algorithms_Ate_My_Life', '#CSSGrid_Unsubscribe', '#Alaska'];

var randomMessage = function() {
  return [randomElement(opening), randomElement(verbs), randomElement(objects), randomElement(nouns), randomElement(tags)].join(' ');
};

// first tweet is specific
var generateSpecificTweet = function() {
  var tweet = {};
  tweet.user = "Prankster_Justin";
  tweet.message = 'I hate CSS';
  tweet.created_at = new Date();
  tweet.profilePhotoURL = './assets/img/' + tweet.user + '.png';
  addTweet(tweet);
};



// generate random tweets on a set schedule
var generateRandomTweet = function() {
  var tweet = {};
  tweet.user = randomElement(users);
  tweet.message = randomMessage();
  tweet.created_at = new Date();
  tweet.profilePhotoURL = './assets/img/' + tweet.user + '.png';
  addTweet(tweet);
};

for (var i = 0; i < 2; i++) {
  generateRandomTweet();
}

var scheduleNextTweet = function() {
  generateRandomTweet();
  setTimeout(scheduleNextTweet, Math.random() * 2000);
};

//calls the special tweet (not randomly generated)
generateSpecificTweet();

//calling the next randomly generated tweet
scheduleNextTweet();




// helper function to have a visitor write a tweet
var writeTweet = function(message) {
  if (!visitor) {
    throw new Error('set the global visitor property!');
  }
  if (!streams.users[visitor]) {
    streams.users[visitor] = [];
  }
  var tweet = {};
  tweet.user = visitor;
  tweet.message = message;
  tweet.created_at = new Date();
  tweet.profilePhotoURL = './assets/img/visitor.png';
  addTweet(tweet);
};
