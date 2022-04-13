const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_KEY === '' ? 'abcdefghijklmnopqrstuvwxyz0123456789' : process.env.JWT_KEY;

const generateAccessToken = function (req, res) {
  const { userId } = req;

  const token = jwt.sign(
    { userId },
    jwtSecret,
    { expiresIn: '1y' },
  );

  return res.status(201).send({
    message: 'Successful Login',
    token,
  });
};

const validateToken = function (req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) {
    return res.status(401).send({
      message: 'no token',
    });
  }
  jwt.verify(token, jwtSecret, (err, userId) => {
    if (err) {
      return res.status(403).send({
        message: 'token couldnt be verified',
      });
    }
    req.userId = userId.userId;
    next();
  });
};

module.exports = { generateAccessToken, validateToken };
