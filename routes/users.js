const { randomUUID } = require('crypto');
const User = require('../models/user');
const VerifyUser = require('../models/user_verify');
const { sendValidationEmail } = require('../email/email');

const API_BASE_URL = (process.env.ENV === 'DEPLOYED') ? "https://www.btcalerter.com" : "http://localhost:3000";

const signup = function (req, res, next) {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user === null) {
        validation_code = randomUUID();

        const newUnverifiedUser = new VerifyUser();
        newUnverifiedUser.verification_complete = false;
        newUnverifiedUser.verification_code = validation_code;
        newUnverifiedUser.name = req.body.name;
        newUnverifiedUser.email = req.body.email;
        newUnverifiedUser.password = req.body.password;
        newUnverifiedUser.setPassword(req.body.password);
        
        newUnverifiedUser.save()
          .then(() => {            
            url = `${API_BASE_URL}/user/verify/${validation_code}`;
            sendValidationEmail(newUnverifiedUser.email, newUnverifiedUser.name, url)
              .then(() => {
                res.status(200).send({
                  message: 'success',
                })
              })
              .catch(err => {
                console.error(err);
                res.status(400).send({
                  message: 'Failed to send email.',
                })
              })
          })
          .catch((err) => {
            console.error(err);
            res.status(400).send({
              message: 'Failed to add unverified user.',
            })
          });
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

const verify = function (req, res, next) {
  code = req.params.code
  if (code === null) {
    return res.status(400).send({
      message: 'No code supplied.',
    });
  }
  VerifyUser.findOne({ verification_code: code, verification_complete: false })
    .then(verified_user => {
      if (verified_user === null) {
        return res.status(400).send({
          message: 'Verification code not found.',
        });
      } else {
        const newUser = new User();
        newUser.name = verified_user.name;
        newUser.email = verified_user.email;
        newUser.salt = verified_user.salt;
        newUser.hash = verified_user.hash;

        newUser.save()
          .then(() => {
            verified_user.verification_complete = true;
            verified_user.save();
            res.status(200).send({
              message: 'User verified.',
            })
          })
          .catch((err) =>  { 
            console.error(err);
            res.status(400).send({
              message: 'Failed to add user.',
            })
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

module.exports = { signup, login, verify };
