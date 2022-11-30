$(document).ready(function() {

  //Select already existing elements
  var $app = $('#app');
  $app.html('');

  //Create new HTML elements
  var $title = $('<h1>Prankwitter </h1>');
  var $subtitle = $('<h2>Microblogging for the Mischievous</h2>');
  var $button = $('<button type="button" class="button" id="update-feed">Click to Refresh the Feed</button>');
  var $feed = $('<div id="feed"></div>');
  var $contentcontainer = $('<div id="contentcontainer"></div>');
  var $halfContainer = $('<div id="halfContainer"></div>');
  var $friends = $('<div id ="friends">Friends</div>');
  var $list = $('<ul class= "friendlist" id="friendlist"></ul>');
  var $newTweetForm = $('<div id="tweetForm"></div>');
  var $usernameInputLabel = $('<label for="userName" id="username">Name</label>');
  var $usernameInput = $('<input type="text" id ="userNameInputField" name="userName">');
  var $messageInputLabel = $('<label for ="message" id="inputlabel">Message</label>');
  var $messageInput = $('<input type="text" id ="inputMessage" name="message" size="300">');
  var $submitButton = $('<button type="button" class="submitButton" id="submitButton">Post to Feed</button>');

  //Functions: Helper event handlers
  var prankAlertLike = function (event) {
    alert('WE DON\'T DO LIKES. DID YOU THINK THIS WAS A REAL WEBSITE? ');
  };

  var prankAlertReply = function (event) {
    alert('CSS ATE MY LIFE. TOO BRAIN DEAD TO REPLY');
  };

  var prankAlertComment = function (event) {
    alert('YOU\'VE BEEN PRANKED! ONLY ROBOTS READ THESE COMMENTS.');
  };

  var prankAlertRetweet = function (event) {
    alert('THIS SITE IS RUN BY BOTS. WHO ARE YOU RE-TWEETING TO?');
  };

  var postToFeed = function (event) {
    alert('YOUR POST WILL BE GONE WHEN YOU LEAVE THE PAGE. ONLY CHUCK NORRIS IS ALLOWED TO POST. YOU ARE NOT CHUCK NORRIS.');
  };

  var hoverColor = function (event) {
    event.target.style.color = 'orange';
  };

  var originColor = function (event) {
    event.target.style.color = '';
  };

  var handleUsernameClick = function (event) {
    $button.html('Back to all Pranksters');
    renderFeed(event, event.target.innerText.slice(1));
  };

  var handleFriendnameClick = function (event) {
    $button.html('Back to all Pranksters');
    renderFeed(event, event.target.innerText);
  };

  var handleButtonClick = function (event) {
    if ($button.html() === 'Back to all Pranksters') {
      $button.html('Click to Refresh the Prank Feed');
      renderFeed();
    }
  };

  //Functions: Friend List
  var friendList = function(object) {
    $('#friendlist').empty();
    for (var key in object) {
      var $listitem = $('<li>' + key + '</li>');
      $listitem.appendTo($list);
      $listitem.on('click', handleFriendnameClick);
      $listitem.on('mouseover', hoverColor);
      $listitem.on('mouseout', originColor);
    }
  };

  //Functions: New Tweet form
  var submitButtonClick = function (event) {
    visitor = $('#userNameInputField').val();
    var messageValue = $('#inputMessage').val();
    writeTweet(messageValue);
    renderFeed();
    friendList(streams.users);
    $('#userNameInputField').val('');
    $('#inputMessage').val('');
    if ($button.html() === 'Back to all Pranksters') {
      $button.html('Click to Refresh the Prank Feed');
    }
  };

  //Functions: The Feed
  var renderFeed = function(event, user) {
    //empty the feed
    $feed.empty();
    //Determine the source array
      //If we've clicked on a user, then the source is streams.users[user] (i.e just that user)
      //Else, the source is streams.home  (i.e all usuers)
    var source;
    if (user) {
      source = streams.users[user];
    } else {
      source = streams.home;
    }
    //iterate through whichever source array we've picked (could be all users or a specific user)
    //Build each users tweets, then attach the tweets to the feed
    var index = source.length - 1;
    while (index >= 0) {
      //variables
      var tweet = source[index];
      var $tweet = $('<div class="tweet" id="tweet"></div>');
      var $username = $('<div class="username"></div>');
      var $message = $('<div class="message"></div>');
      var $timestamp = $('<div class="timestamp"></div>');
      var $photo = $('<img class="profile-photo" src=' + tweet.profilePhotoURL + '>');
      var $comment = $('<i class="fas fa-comment icon comment" ></i>');
      var $retweet = $('<i class="fas fa-retweet icon retweet"></i>');
      var $like = $('<i class="fas fa-thumbs-up icon like"></i>');
      var $share = $('<i class="fas fa-share-square icon share"></i>');
      //text displays
      $username.text('@' + tweet.user);
      $message.text(tweet.message);
      $timestamp.text(jQuery.timeago(tweet.created_at));
      //event listeners
      $username.on('click', handleUsernameClick);
      $username.on('mouseover', hoverColor);
      $username.on('mouseout', originColor);
      $comment.on('click', prankAlertComment);
      $comment.on('mouseover', hoverColor);
      $comment.on('mouseout', originColor);
      $retweet.on('click', prankAlertRetweet);
      $retweet.on('mouseover', hoverColor);
      $retweet.on('mouseout', originColor);
      $like.on('click', prankAlertLike);
      $like.on('mouseover', hoverColor);
      $like.on('mouseout', originColor);
      $share.on('click', prankAlertReply);
      $share.on('mouseover', hoverColor);
      $share.on('mouseout', originColor);
      //Append elements to the tweet
      $photo.appendTo($tweet);
      $username.appendTo($tweet);
      $message.appendTo($tweet);
      $timestamp.appendTo($tweet);
      $comment.appendTo($tweet);
      $retweet.appendTo($tweet);
      $like.appendTo($tweet);
      $share.appendTo($tweet);
      // Append the tweet to the feed
      $tweet.appendTo($feed);
      // decrement our while loop by one (i.e On to the next tweet!)
      index -= 1;
    }
  };

  //Primary function calls
  renderFeed();
  friendList(streams.users);

  //Event listeners
  $button.on('click', renderFeed);
  $button.on('click', handleButtonClick);
  $submitButton.on('click', submitButtonClick);
  // $submitButton.on('click', postToFeed);


  // Append new elements to the DOM (i.e the main webpage)
  $title.appendTo($app);
  $subtitle.appendTo($app);
  $button.appendTo($app);
  $feed.appendTo($contentcontainer);
  $halfContainer.appendTo($contentcontainer);
  $contentcontainer.appendTo($app);
  $usernameInputLabel.appendTo($newTweetForm);
  $usernameInput.appendTo($newTweetForm);
  $messageInputLabel.appendTo($newTweetForm);
  $messageInput.appendTo($newTweetForm);
  $submitButton.appendTo($newTweetForm);
  $newTweetForm.appendTo($halfContainer);
  $list.appendTo($friends);
  $friends.appendTo($halfContainer);
});