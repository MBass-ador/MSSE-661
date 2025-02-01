// use npm express to publish server
const express = require('express');

const app = express();

// use content in folder "public"
app.use(express.static('public'));

// location of css folder http://localhost:3000/css
app.use('/css', express.static(__dirname + '/public/css')); 


// location of js(for browser) folder http://localhost:3000/js
app.use('/js', express.static(__dirname + '/public/src')); 

// listen on port 3000 and log
app.listen(3000, function() {
  console.log('Server started at http://localhost:%s', 3000);
});