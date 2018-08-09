const db = require('../db.js');
const Sequelize = require('sequelize');

const Movies = db.define('movies', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    notNull: true,
  },
  title_alternate: {
    type: Sequelize.STRING,
  },
  release_date: {
    type: Sequelize.DATEONLY,
    notNull: true,
  },
  run_time: {
    type: Sequelize.TIME,
    notNull: true,
  },
  poster: {
    type: Sequelize.TEXT,
  },
}, {
  timestamps: false,
});

module.exports = {
  Movies: {
    get(req, res) {
      return Movies.findAll();
    },
    post(req, res) {
      return Movies.findOrCreate({
        where: {
          title: req.body.title,
        },
        defaults: {
          release_date: req.body['release-date'],
          run_time: req.body['run-time'],
          poster: req.body.poster,
          title_alternate: req.body['title-alternate'],
        },
      })
        .then(movie => movie)
        .spread((movie, create) => {
          console.log(movie.get({
            plain: true,
          }));
          if (!create) {
            if (movie.title_alternate === null) {
              movie.update({ title_alternate: req.body['title-alternate'] });
            }
            if (movie.poster === null) {
              movie.update({ poster: req.body.poster });
            }
          }
          return movie;
        })
        .catch(err => console.error(err));
    },
  },
};
