const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db/db.js');
const { Movies } = require('./db/models/movies.js');
const { Directors } = require('./db/models/directors.js');
const { Writers } = require('./db/models/writers.js');
const { Studios } = require('./db/models/studios.js');
const { Genres } = require('./db/models/genres.js');
const { Episodes } = require('./db/models/episodes.js');
const { Actors } = require('./db/models/actors.js');

const app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('index.html');
});

app.get('/movie', (req, res) => {
  res.sendFile('public/movie.html', { root: __dirname });
});

app.post('/movie', (req, res) => {
  Movies.post(req);
  res.json('movie added!');
});

app.get('/director', (req, res) => {
  res.sendFile('public/director.html', { root: __dirname });
});

app.post('/director', (req, res) => {
  Directors.post(req);
  res.json('director added!');
});

app.get('/writer', (req, res) => {
  res.sendFile('public/writer.html', { root: __dirname });
});

app.post('/writer', (req, res) => {
  Writers.post(req);
  res.json('writer added!');
});

app.get('/studio', (req, res) => {
  res.sendFile('public/studio.html', { root: __dirname });
});

app.post('/studio', (req, res) => {
  Studios.post(req);
  res.json('studio added!');
});

app.get('/genre', (req, res) => {
  res.sendFile('public/genre.html', { root: __dirname });
});

app.post('/genre', (req, res) => {
  Genres.post(req);
  res.json('genre added!');
});

app.get('/episode', (req, res) => {
  res.sendFile('public/episode.html', { root: __dirname });
});

app.post('/episode', (req, res) => {
  const movie = Movies.findOne({ title: req.body.title });
  req.body.id_movie = movie.id;
  Episodes.post(req);
  res.json('episode added!');
});

app.get('/actor', (req, res) => {
  res.sendFile('public/actor.html', { root: __dirname });
});

app.post('/actor', (req, res) => {
  Actors.post(req);
  res.json('actor added!');
});


app.listen(3000);

