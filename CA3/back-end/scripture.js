const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");

const User = users.model;
const validUser = users.valid;

// This is the schema for a scripture
const scriptureSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    book: String,
    chapter: String,
    verse: String,
    topic: String,
    text: String,
    created: {
      type: Date,
      default: Date.now
    },
  });

  // The model for a scripture
const Scripture = mongoose.model('Scripture', scriptureSchema);

// get scriptures -- will list scriptures that a user has submitted
router.get('/', validUser, async (req, res) => {
    try {
      let scriptures = await Scripture.find({
        user: req.user
      }).sort({
        created: -1
      }).populate('user');
      return res.send(scriptures);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

// create a ticket
router.post('/', validUser, async (req, res) => {
    const scripture = new Scripture({
      user: req.user,
      book: req.body.book,
      chapter: req.body.chapter,
      verse: req.body.verse,
      topic: req.body.topic,
      text: req.body.text
    });
    try {
      await scripture.save();
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  //Delete a scripture from the list
  router.delete('/:id', async (req, res) => {
    try {
      await Scripture.deleteOne({
        _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  });  

// Edit scripture information
router.put('/:id', async (req, res) => {
  try {
    let scripture = await Scripture.findOne({_id: req.params.id});
    scripture.book = req.body.book;
    scripture.chapter = req.body.chapter;
    scripture.verse = req.body.verse;
    scripture.topic = req.body.topic;
    scripture.text = req.body.text;	  
    scripture.save();
    res.send(scripture);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});  

  module.exports = {
    routes: router,
    model: Scripture,
    valid: validUser
  }