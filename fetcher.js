
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
    if (!response) { 
      console.log(`The website returned error.  Please enter a valid website url.`);
      return;
    }
    if (response.statusCode < 300 && response.statusCode >= 200) {
      cbFileSave(localFileFolder, body);
    } else {
      console.log(`The webpage returned error: ${response.statusCode}.  Please enter a valid web page url.`);
    }
  });
};

const checkFileAndPath = function (pathAndFile, cbGetPage, url) {
  const path = pathAndFile.substr(0,pathAndFile.lastIndexOf('/') + 1);
  const fileName = pathAndFile.substr(pathAndFile.lastIndexOf('/') + 1);
  //console.log("path:", path);
  //console.log("file:", fileName);
  if (!fs.existsSync(path)) {
    console.log(`The file path ${path} does not exist. Please input a valid path.`)
    process.exit;
  }
  if (fs.existsSync(pathAndFile)) {
    console.log(`The file ${pathAndFile} exists. Please input a new file.`);
  } else {
    console.log("call get page");
    cbGetPage(url, pathAndFile, fileSaveFn);
  }
}

//main body
if (process.argv.length >= 4) {
  const urlIn = process.argv[2];
  const localPathAndFile = process.argv[3];
  checkFileAndPath(localPathAndFile, getPageAtURL, urlIn);
}
