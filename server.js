const express = require("express");
const app = express();
const path = require("path");

const PORT = 3000;

// create a listen
app.listen(PORT, function() {
    console.log(`App listening on PORT ${PORT}`);
  });

  const mainDir = path.join(__dirname, "/public");

  app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });