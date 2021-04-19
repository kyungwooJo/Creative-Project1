const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
}));

// parse application/json
app.use(bodyParser.json());

// connect to the database
mongoose.connect('mongodb://localhost:27017/scriptureList', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a scheme for projects
const scriptureSchema = new mongoose.Schema({
  book: String,
  chapter: String,
  verse: String,
  topic: String,
  text: String,	
});

// Create a model for projects
const Scripture = mongoose.model('Scripture', scriptureSchema);

// Create a project
app.post('/api/scripture', async (req, res) => {
  const scripture = new Scripture({
    book: req.body.book,
    chapter: req.body.chapter,
    verse: req.body.verse,
    topic: req.body.topic,
    text: req.body.text	  
  });
  try {
    await scripture.save();
    res.send(scripture);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all projects
app.get('/api/scripture', async (req, res) => {
  try {
    let scriptures = await Scripture.find();
    res.send(scriptures);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Edit scripture information
app.put('/api/scripture/:id', async (req, res) => {
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

app.delete('/api/scripture/:id', async (req, res) => {
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


app.listen(3001, () => console.log('Server listening on port 3001!'))


















