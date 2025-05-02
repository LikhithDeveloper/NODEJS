const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

// Directory to store uploaded files
const UPLOAD_DIR = path.join(__dirname, "uploads");
if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR);

// Upload binary file
app.post("/upload/:filename", (req, res) => {
  console.log(req);
  const filePath = path.join(UPLOAD_DIR, req.params.filename);
  const writeStream = fs.createWriteStream(filePath);

  req.pipe(writeStream);
  req.on("end", () => {
    res.status(200).send("File uploaded successfully");
  });
});

// Download file
app.get("/download/:filename", (req, res) => {
  const filePath = path.join(UPLOAD_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) return res.status(404).send("File not found");

  res.setHeader("Content-Type", "application/octet-stream");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${req.params.filename}"`
  );
  fs.createReadStream(filePath).pipe(res);
});

app.listen(PORT, () =>
  console.log(`Server running at http://localhost:${PORT}`)
);
