// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

//Setting the app to use express.js for get the data sended by params or body
app.use(express.json())

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", (req, res) => {
    var data = new Date
    res.json({unix: data.getTime(), utc: data.toUTCString()});
})

// your first API endpoint... 
app.get("/api/:id", async(req, res) => {
  var { id } =  req.params
  console.log(id)
  if(!isNaN(id)){
    var data = new Date(Number(id))
    if(data === undefined || data === null || data == "Invalid Date"){
      return res.json({ error : "Invalid Date" })
    }
  
    return res.json({unix: data.getTime(), utc: data.toUTCString()});
  }
  var data = new Date(id)
  console.log(data)
  if(data === undefined || data === null || data == "Invalid Date"){
    return res.json({ error : "Invalid Date" })
  }

  return res.json({unix: data.getTime(), utc: data.toUTCString()});

});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
