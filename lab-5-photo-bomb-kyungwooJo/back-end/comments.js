const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const users = require("./users.js");
const User = users.model;
const Photos = require("./photos.js");
const Photo = Photos.model;

const commentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  photo: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  },
  userName: String,
  comment: String,
  created: {
    type: Date,
    default: Date.now
  },
});


const Comment = mongoose.model('Comment', commentSchema);

/* Middleware */

// middleware function to check for logged-in users
const validUser = async (req, res, next) => {
  if (!req.session.userID){
    return res.status(403).send({
      message: "not logged in"
    });   
  }
  try {
    const user = await User.findOne({     
      _id: req.session.userID
    });
    if (!user) {
      return res.status(403).send({
        message: "not logged in"
      });
    }
    // set the user field in the request
    req.user = user;
  } catch (error) {
    // Return an error if user does not exist.
    return res.status(403).send({
      message: "not logged in"
    });
  }

  // if everything succeeds, move to the next middleware
  next();
};

// write comment(id = user'id)
router.post("/:id", validUser, async (req, res) => {
     
      let photo = await Photo.findOne({
        _id: req.params.id
      }).populate('user');


    try {

      let UserComment = new Comment({
        comment: req.body.comment,
        user: req.user,
        userName: req.user.username,
        photo: photo,
      });
      
      await UserComment.save();
      return res.sendStatus(200);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // get comment list for a chosen picture
  router.get("/:id", async (req, res) => {
    
    let photo = await Photo.findOne({
      _id: req.params.id
    }).populate('user');

    try {
      let comments = await Comment.find({
        photo: photo
      }).populate('user');
      return res.send(comments);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  
  })

  module.exports = {
    routes: router,
    model: Comment,
    valid: validUser
  };
  