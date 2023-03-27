// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();


// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
  let date = new Date();
  res.json({ 
    unix: Math.floor(date.getTime() / 1000), 
    utc: date.toUTCString() 
  })
})

// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  let date = req.params.date

  if (!isNaN(Number(date)) && date.length == 13) {
    let utc = new Date (Math.floor(date)*1000)
    return res.json({
      unix: Number(date),
      utc: utc.toUTCString()
    })
  }

  if (new Date(date).toUTCString() != "Invalid Date") {
    let utc = new Date(date).toUTCString()
    return res.json({
      unix: new Date(date).getTime(),
      utc: utc
    })
  }

  if(new Date(date) == "Invalid Date"){
    return res.json({
      error: 'Invalid Date'
    })
  }

})





// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + 3000);
});
