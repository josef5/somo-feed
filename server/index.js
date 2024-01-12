require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const feed = require("./data/feed.json");
const comments = require("./data/comments.json");

const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, "assets")));

app.listen(4000, function (err) {
  if (err) return err;
  console.log("(HTTP) App now running on port", 4000);
});

app.get("/feed", function (req, res) {
  // Query string parameters are optional
  // If none are specified all items will be returned
  // start will default to 0
  // end will default to undefined, i.e. unlimited
  const start = req.query.START ? parseInt(req.query.START) : 0;
  const pageSize = req.query.PAGE_SIZE && parseInt(req.query.PAGE_SIZE);
  const end = pageSize ? start + pageSize : undefined;

  res.status(200).send(feed.slice(start, end));
});

app.get("/comments", function (req, res) {
  // res.status(400).send("No briefref provided");
  res.status(200).send(comments);
});

app.get("/comments/:briefref", function (req, res) {
  res
    .status(200)
    .send(comments.filter((item) => item.briefref === req.params.briefref));
});
