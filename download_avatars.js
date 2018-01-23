var request = require('request');
var fs = require('fs');

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


function downloadImageByURL(url, filePath) {
  //console.log (url)
  console.log(filePath)
  request(url)
  .on('error', function(err){
    throw err;
   })
  .on('response', function(response){
    console.log('Downloading.....');
  })
  .pipe(fs.createWriteStream(filePath))
  .on('finish', function(){
    console.log("Finished downloading");
  });
 }

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

getRepoContributors("jquery", "jquery", function(err, result) {
  if (err) {
    console.log("Errors:", err);
  }
//var avatar = []
// for(var i = 0; i < result.length; i++) {
  for(var contributor of result) {
    console.log(contributor)
    //avatar.push(result[i].avatar_url)
    //console.log ("avatar_url: " + avatar )
    //downloadImageByURL(list, 'avatars/'+ list.login +'.jpg' )
    //avatar.push(result[i].avatar_url)
   downloadImageByURL(contributor.avatar_url, 'avatars/'+ contributor.login +'.jpg' )

}

    //console.log ("avatar_url: " + avatar )
});



