const db = require('../db.js');
const Sequelize = require('sequelize');

const Genres = db.define('genres', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    notNull: true,
  },
  photo: {
    type: Sequelize.TEXT,
  },
}, {
  timestamps: false,
});

module.exports = {
  Genres: {
    get(req, res) {
      return Genres.findAll();
    },
    post(req, res) {
      return Genres.findOrCreate({
        where: {
          name: req.body.name,
        },
        photo: req.body.photo,
      })
        .then(genre => genre)
        .spread((genre, create) => {
          console.log(genre.get({
            plain: true,
          }));
          if (!create) {
            if (genre.photo === null) {
              genre.update({ photo: req.body.photo });
            }
          }
          return genre;
        })
        .catch(err => console.error(err));
    },
  },
};
