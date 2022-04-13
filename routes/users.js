const User = require('../models/user');

const signup = function (req, res, next) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        const newUser = new User();
        newUser.name = req.body.name;
        newUser.email = req.body.email;
        newUser.password = req.body.password;
        newUser.setPassword(req.body.password);

        newUser.save()
          .then(() => {
            req.userId = newUser.id
            next()
          })
          .catch(() => res.status(400).send({
            message: 'Failed to add user.',
          }));
      } else {
        return res.status(400).send({
          message: 'User already exists.',
        });
      }
    })
    .catch(() => res.status(500).send({
      message: 'Internal Server Error',
    }));
};

const login = function (req, res, next) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        return res.status(400).send({
          message: 'User not found.',
        });
      }

      if (user.validPassword(req.body.password)) {
        req.userId = user.id;
        return next();
      }

      return res.status(400).send({
        message: 'Wrong Password',
      });
    })
    .catch(() => res.status(500).send({
      message: 'Internal Server Error',
    }));
};

module.exports = { signup, login };
