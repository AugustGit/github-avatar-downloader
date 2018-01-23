var request = require('request');

var getToken = require('./secrets.js').GITHUB_TOKEN // get from a file that is .gitignore



console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors" ,
    headers: {
      'User-Agent': 'request',
      'Authorization': getToken
    }
  };

request(options, function(err, res, body) {
      var parsed = JSON.parse(body)
      cb(err, parsed);{
    }
  });
}


getRepoContributors("jquery", "jquery", function(err, result) {
  if (err) {
    console.log("Errors:", err);
  }
  console.log("Result:", result);
var avatar = []

 for(var i = 0; i < result.length; i++) {
    avatar.push(result[i].avatar_url)
    }
      //console.log(avatar_url)
    console.log ("avatar_url: " + avatar )
});

function downloadImageByURL(url, filePath) {
  // ...
}
/*
Result: { message: 'API rate limit exceeded for 69.174.3.130. (But here\'s the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)',
  documentation_url: 'https://developer.github.com/v3/#rate-limiting' }
avatar_url:
*/
// const

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")
// avatar_url
