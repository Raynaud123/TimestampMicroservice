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
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});


app.get("/api/:date", function(req, res, next) {
  req.date = req.params.date;
  next()
},
  (req, res, next) => {

    if (isNaN(req.date)) {
      let date = new Date(req.date);
      if (!isFinite(date.getTime())) {
        res.json({ error: "Invalid Date" })
      } else {
        let unix = Math.floor(date.getTime())
        let formatted = date.toGMTString();
        res.json({ "unix": unix, "utc": formatted })
      }
    } else {

      let date = new Date(parseInt(req.date));
      let formatted = date.toGMTString();
      console.log(formatted)
      res.json({ "unix": parseInt(req.date), "utc": formatted })

    }

  })

app.get("/api/", function(req, res, next) {
  let date = new Date();
  let unix = Math.floor(date.getTime());
  let formatted = date.toGMTString();
  res.json({ "unix": unix, "utc": formatted })
})


// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
