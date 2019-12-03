var express = require("express");
var path = require("path");


var app = express();
var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
  
var notes = [
    {
        routename: "newnote",
        name: "New Note",
        note: "Add Info",
        date: "MM/DD/YYYY"
    }
]

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("/api/notes", function(req, res) {
    return res.json(notes);
});

app.get("/api/notes/:notes", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
    var chosen = req.params.notes;
  
    console.log(chosen);
  
    for (var i = 0; i < notes.length; i++) {
      if (chosen === notes[i].name) {
        return res.json(notes[i]);
      }
    }
  
    return res.json(false);
});
  
app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    newNote.routename = newNote.note.replace(/\s+/g, "").toLowerCase();
  
    console.log(newNote);
  
    notes.push(newNote);
    res.json(newNote);
});

app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});