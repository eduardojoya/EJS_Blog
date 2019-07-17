//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent =
  "This is a  Blog website created using EJS to solidify my foundation in JavaScript";
const aboutContent = "My name is Edo and I'm an aspiring software developer";
const contactContent = "Github- https://github.com/eduardojoya";

const app = express();
let posts = [];

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function (req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function (req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function (post) {
    const storedTitle = _.lowerCase(post.title);
    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});

app.listen(3000, function () {
  console.log("Server started on port 3000");
});