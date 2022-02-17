
// this app takes two commandline args
//Inputs: URL, Local File Path.
//it downloads the resource at the URL to the local path on your machine.
//output: message like downloaded and saved 1234 bytes to ./index.html.

//Edge Cases:
//1. If the local file already exists don't write the file. indicate the file exists and stop.
//2. If the local file path given is invalid? - stop. don't download anything. Indicate the path is invalid. 
//3. the URL results in an error or non-200 result. Indicate the webpage had an error.


const fs = require('fs')
const request = require('request');

const fileSaveFn = function (localFile, bodyText) {
  fs.writeFile(localFile, bodyText, err => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`Downloaded and saved ${bodyText.length} bytes to ${localFile}`);
  });
}

const getPageAtURL = function (url, localFileFolder, cbFileSave) {

  request(url, (error, response, body) => {
    cbFileSave(localFileFolder, body);
  });
};

if (process.argv.length >= 4) {
  const urlIn = process.argv[2];
  const localFolder = process.argv[3];
  getPageAtURL(urlIn, localFolder, fileSaveFn);
}