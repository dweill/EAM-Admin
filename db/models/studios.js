const db = require('../db.js');
const Sequelize = require('sequelize');

const Studios = db.define('studios', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    notNull: true,
  },
  established: {
    type: Sequelize.DATEONLY,
    notNull: true,
  },
  location: {
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
  Studios: {
    get(req, res) {
      return Studios.findAll();
    },
    post(req, res) {
      return Studios.findOrCreate({
        where: {
          name: req.body.name,
        },
        defaults: {
          established: req.body.established,
          location: req.body.location,
          photo: req.body.photo,
        },
      })
        .then(studio => studio)
        .spread((studio, create) => {
          console.log(studio.get({
            plain: true,
          }));
          if (!create) {
            if (studio.photo === null) {
              studio.update({ photo: req.body.photo });
            }
          }
          return studio;
        })
        .catch(err => console.error(err));
    },
  },
};
