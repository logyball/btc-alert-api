const Alert = require('../models/alert');

const addAlert = function (req, res) {
  const alertName = (req.body.name === undefined || req.body.name === '') ? 'Default Alert' : req.body.name;
  const { price } = req.body;
  const alertType = String(req.body.type).toUpperCase();

  const newAlert = new Alert();
  newAlert.userId = req.userId;
  newAlert.name = alertName;
  newAlert.type = alertType;
  newAlert.price = price;
  newAlert.status = 'ACTIVE';

  newAlert.save()
    .then((result) => {
      console.log('insertion result: ', result);
      res.send({
        message: 'New alert created',
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send('failed to create new alert');
    });
};

const getAlertsByUserId = function (req, res) {
  const { userId } = req;

  Alert.find({ userId })
    .then((result) => {
      console.log(result);
      res.send({
        count: result.length,
        alerts: result, 
      });
    })
    .catch((err) => {
      console.error(err);
      res.status(500);
      res.send('failed to get alert(s)');
    });
};

module.exports = { addAlert, getAlertsByUserId };
