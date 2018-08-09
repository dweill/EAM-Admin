const db = require('../db.js');
const Sequelize = require('sequelize');

const Episodes = db.define('episodes', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  id_movie: {
    type: Sequelize.INTEGER,
    notNull: true,
  },
  release_date: {
    type: Sequelize.DATEONLY,
    notNull: true,
  },
  photo: {
    type: Sequelize.TEXT,
  },
}, {
  timestamps: false,
});

module.exports = {
  Episodes: {
    get(req, res) {
      return Episodes.findAll();
    },
    post(req, res) {
      return Episodes.findOrCreate({
        where: {
          id_movie: req.body.id_movie,
        },
        defaults: {
          release_date: req.body['release-date'],
          photo: req.body.photo,
        },
      })
        .then(episode => episode)
        .spread((episode, create) => {
          console.log(episode.get({
            plain: true,
          }));
          if (!create) {
            if (episode.photo === null) {
              episode.update({ photo: req.body.photo });
            }
          }
          return episode;
        })
        .catch(err => console.error(err));
    },
  },
};
