const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    res.render("task1", { files: files });
  });
});

app.post("/create", (req, res) => {
  const { title, details } = req.body;
  fs.writeFile(`./files/${title.split(" ").join("")}.txt/`, details, (err) => {
    res.redirect("/");
  });
});
app.listen(port, () => {
  console.log(`Server is started under port: ${port}`);
});
