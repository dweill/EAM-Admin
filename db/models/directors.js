const db = require('../db.js');
const Sequelize = require('sequelize');

const Directors = db.define('directors', {
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
    notNull: true,
  },
  birthdate: {
    type: Sequelize.DATEONLY,
    notNull: true,
  },
  birth_place: {
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
  Directors: {
    get(req, res) {
      return Directors.findAll();
    },
    post(req, res) {
      console.log(req.body.photo);
      return Directors.findOrCreate({
        where: {
          name_first: req.body['name-first'],
          name_last: req.body['name-last'],
        },
        defaults: {
          birthdate: req.body.birthdate,
          birth_place: req.body['birth-place'],
          photo: req.body.photo,
        },
      })
        .then(director => director)
        .spread((director, create) => {
          console.log(director.get({
            plain: true,
          }));
          if (!create) {
            console.log('am i hit');
            if (director.photo === null) {
              console.log('what about me');
              director.update({ photo: req.body.photo });
            }
          }
          return director;
        })
        .catch(err => console.error(err));
    },
  },
};
