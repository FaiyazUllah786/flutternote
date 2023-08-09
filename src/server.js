const express = require('express');

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(bodyParser.json());

const Note = require("./models/note");

mongoose.connect("mongodb+srv://faiyazullah:faiyazmongo@cluster0.goocj3m.mongodb.net/notesdb").then(function() {
  console.log("database connected successfully");

  app.get("/",function(req,res) {
    res.send("<h1>Server is UP and Running.....</h1>");
  });

  app.post("/notes/list/",function(req,res) {
    var notes = Note.find({userId:req.body.userId}).then(
      function(data) {
          res.send(data);
      }
    );

  });

  app.post("/notes/add",async function(req,res) {
    await Note.deleteOne({id:req.body.id});
    const newNote = new Note({
      id:req.body.id,
      userId:req.body.userId,
      title:req.body.title,
      content:req.body.content
    });

    await newNote.save();
    const response = {message:"Note created"+`id: ${req.body.id}`};
    res.json(response);
  });

  app.post("/notes/delete",async function(req,res) {
    await Note.deleteOne({id:req.body.id});
    const response = {message:"Note deleted"+`id: ${req.body.id}`};
    res.json(response);
  });

});

const PORT = process.env.PORT || 5000;
app.listen(PORT,function() {
  console.log("Server is UP"+PORT);
});
