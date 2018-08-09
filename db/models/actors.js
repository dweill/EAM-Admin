const db = require('../db.js');
const Sequelize = require('sequelize');

const Actors = db.define('actors', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name_first: {
    type: Sequelize.STRING,
    notNull: true,
  },
  name_last: {
    type: Sequelize.STRING,
  },
  birthdate: {
    type: Sequelize.DATEONLY,
    notNull: true,
  },
  birth_place: {
    type: Sequelize.STRING,
    notNull: true,
  },
  headshot: {
    type: Sequelize.TEXT,
  },
}, {
  timestamps: false,
});

module.exports = {
  Actors: {
    get(req, res) {
      return Actors.findAll();
    },
    post(req, res) {
      return Actors.findOrCreate({
        where: {
          name_first: req.body['name-first'],
          name_last: req.body['name-last'],
        },
        defaults: {
          birthdate: req.body.birthdate,
          birth_place: req.body['birth-place'],
          headshot: req.body.headshot,
        },
      })
        .then(actor => actor)
        .spread((actor, create) => {
          console.log(actor.get({
            plain: true,
          }));
          if (!create) {
            if (actor.name_last === null) {
              actor.update({ name_last: req.body['name-last'] });
            }
            if (actor.headshot === null) {
              actor.update({ headshot: req.body.headshot });
            }
          }
          return actor;
        })
        .catch(err => console.error(err));
    },
  },
};
