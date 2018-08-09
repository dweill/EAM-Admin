const db = require('../db.js');
const Sequelize = require('sequelize');

const Writers = db.define('writers', {
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
  photo: {
    type: Sequelize.TEXT,
  },
}, {
  timestamps: false,
});

module.exports = {
  Writers: {
    get(req, res) {
      return Writers.findAll();
    },
    post(req, res) {
      return Writers.findOrCreate({
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
        .then(writer => writer)
        .spread((writer, create) => {
          console.log(writer.get({
            plain: true,
          }));
          if (!create) {
            if (writer.photo === null) {
              writer.update({ photo: req.body.photo });
            }
          }
          return writer;
        })
        .catch(err => console.error(err));
    },
  },
};
