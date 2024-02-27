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

function dateValidation(str){
  // Interprets a string with only numbers as milliseconds
  if (str.match(/\d+/)[0].length===str.length) return new Date(parseInt(str))
  return new Date(str)
}

// Standard endpoint. Expects a valid date_string 
app.get("/api/:date", function (req, res) { 
try{
    const d = dateValidation(req.params.date)
    res.json({unix: d.getTime(), utc: d.toUTCString()});
  }catch(err){
    res.json({error:"Invalid Date"})
  }
});

// With an EMPTY req.params.date
app.get("/api", function (req, res) { 
  const d = new Date()
  res.json({unix: d.getTime(), utc: d.toUTCString()});
});


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  // console.log('Your app is listening on port ' + listener.address().port);
  console.log('Your app is listening on http://localhost:' + listener.address().port);
});
