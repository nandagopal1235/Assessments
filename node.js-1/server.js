const express = require("express");
const multer = require("multer");
const fs = require("fs");
const readline = require("readline");
const { Transform } = require("stream");
const app = express();
const upload = multer({ dest: "uploads/" });
app.post("/transform", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res
        .status(400)
        .json({ error: "No file uploaded. Field name must be file" });
    }
    const filePath = req.file.path;
    const lines = [];
    const fileStream = fs.createReadStream(filePath);
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    });
    for await (const line of rl) {
      const transformedLine = await new Promise((resolve) => {
        setTimeout(() => resolve(line.toUpperCase()), 20);
      });
      lines.push(transformedLine);
    }
    fs.unlinkSync(filePath);
    res.json({ transformed: lines });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.listen(3000, () => {
  console.log("server running on port 3000");
});
