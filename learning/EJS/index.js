const express = require("express");
const path = require("path");
const app = express();
port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public"))); // for static files like css, js, images etc...

app.set("view engine", "ejs"); // add ejs engine
app.set("views", path.join(__dirname, "views")); // for views directory

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/about/:id", (req, res) => {
  res.render("about");
});

app.listen(port, () => {
  console.log(`server started ${port}`);
});
