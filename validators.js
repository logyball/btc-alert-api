const validateAlertParams = function (req, res, next) {
  const reqParams = req.body;
  const { price } = reqParams;
  if (price === undefined || typeof price !== 'number' || price < 0) {
    res.status(400);
    res.send('price param bad');
    return;
  }

  const type = String(reqParams.type).toUpperCase();
  const alertTypesSet = new Set(['MAX', 'MIN']);
  if (type === undefined || !alertTypesSet.has(type)) {
    res.status(400);
    res.send('type param bad');
    return;
  }

  const { name } = reqParams;
  if (name === undefined || typeof name !== 'string') {
    res.status(400);
    res.send('name param bad');
    return;
  }

  next();
};

const validateSignupParams = function (req, res, next) {
  const reqParams = req.body;
  const { name } = reqParams;
  if (name === undefined || typeof name !== 'string' || name === '') {
    res.status(400);
    res.send('name param bad');
    return;
  }

  const { email } = reqParams;
  if (email === undefined || typeof email !== 'string' || email === '') {
    res.status(400);
    res.send('email param bad');
    return;
  }

  const { password } = reqParams;
  if (password === undefined || typeof password !== 'string' || password === '') {
    res.status(400);
    res.send('password param bad');
    return;
  }

  next();
};

const validateLoginParams = function (req, res, next) {
  const reqParams = req.body;

  const { email } = reqParams;
  if (email === undefined || typeof email !== 'string' || email === '') {
    res.status(400);
    res.send('email param bad');
    return;
  }

  const { password } = reqParams;
  if (password === undefined || typeof password !== 'string' || password === '') {
    res.status(400);
    res.send('password param bad');
    return;
  }

  next();
};

const validateGetAlertsByUserIdParams = function (req, res, next) {
  const { userId } = req;
  if (userId === undefined || typeof userId !== 'string' || userId === '') {
    res.status(400);
    res.send('userId param bad');
    return;
  }

  next();
};

module.exports = {
  validateAlertParams, validateSignupParams, validateLoginParams, validateGetAlertsByUserIdParams,
};
