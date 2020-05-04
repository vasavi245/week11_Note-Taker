const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 8000;

const mainDir = path.join(__dirname, "/public");

// Sets up the Express app to handle data parsing
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


  app.get("/notes", function(req, res) {
    res.sendFile(path.join(mainDir, "notes.html"));
  });

  app.get("/api/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/db/db.json"));
  });

  app.get("/api/notes/:id", function(req, res){
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    res.json(savedNotes[Number(req.params.id)]);
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(mainDir, "index.html"));
  });

  // post new notes to db.json file
  app.post("/api/notes", function(req, res){
     let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
     let newNote = req.body;
     let noteId = (savedNotes.length).toString();
     newNote.id = noteId;
     savedNotes.push(newNote);
     notesData = JSON.stringify(savedNotes)
     fs.writeFile("./db/db.json", notesData, function(err){
       if(err) throw err;
       console.log("Note saved to db.json");
     });
     
     res.json(savedNotes);
  });

  app.delete("/api/notes/:id", function(req, res){
    let savedNotes = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let uniqueId = req.params.id;
    let newId = 0;
    console.log(`Deleting note with id ${uniqueId}`);
    savedNotes = savedNotes.filter(function(currentNote){
      return currentNote.id != uniqueId;
    })

    for (currentNote of savedNotes) {
      currentNote.id = newId.toString();
      newId++;
  }

  fs.writeFileSync("./db/db.json", JSON.stringify(savedNotes));
  res.json(savedNotes);

  });

  // create a listen
app.listen(PORT, function() {
  console.log(`App listening on PORT ${PORT}`);
});