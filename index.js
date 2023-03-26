// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date", function (req, res) {
  if(req.params.date.length==13){
    let unixD = req.params.date
    let date = new Date (Math.floor(unixD))
    let one = date.toUTCString();

    res.json({unix:Number(unixD),utc:one})
  }else{
    let date = new Date(req.params.date)
    let utcD = Math.floor(date.getTime()/1000)
    res.json({unix:Number(utcD),utc:date.toUTCString()})
  }
  
});




// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
