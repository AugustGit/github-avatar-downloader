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
/*
request.get(url, function(response) {
  console.log('Download complete.');
       })
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Downloading image...');
         console.log('Response Status Code: ', response.statusCode, response.statusMessage, response.headers['content-type']);
       })
       .pipe(fs.createWriteStream('./future.jpg'));


  // ...
}
*/



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


/*
+function downloadImageByURL(url, filePath) {
+  request(url)
+  .on('error', function(err){
+    throw err;
+  })
+  .on('response', function(response){
+    console.log('Downloading image...');
+    console.log('HTTP Status', response.statusCode, response.statusMessage);
+    console.log('HTTP Content-Type: \'' + response.headers['content-type'] + '\'');
+  })
+  .pipe(fs.createWriteStream(filePath))
+  .on('finish', function(){
+    console.log("Download complete");
+  });
+}
*/
