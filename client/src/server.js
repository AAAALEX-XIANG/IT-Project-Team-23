const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const path = require("path");

// test express where the static files are kept
app.use(express.static(__dirname + "/src"));

// use the body-parser middleware, which parses request bodies into req.body
// support parsing of json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//app.set('views', path.join(__dirname, 'views'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, "..", "build")));

// start app and listen for incoming requests on port
app.listen(process.env.PORT || 3000, () => {
  console.log("The server is running!");
});

app.get("/register", (req, res) => {
  console.log("hi from app.get.register");
  res.sendFile(path.resolve(__dirname, "..", "build", "index.html"));
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get("env") === "development") {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {},
  });
});

module.exports = app;
