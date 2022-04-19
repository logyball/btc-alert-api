const express = require('express');
const mongoose = require('mongoose');
const dotenvConfig = require('dotenv').config();
const cors = require('cors');
const {
  validateAlertParams, validateSignupParams, validateLoginParams, validateGetAlertsByUserIdParams,
} = require('./validators');
const { addAlert, getAlertsByUserId } = require('./routes/alerts');
const { signup, login } = require('./routes/users');
const { generateAccessToken, validateToken } = require('./routes/authentication');

const port = process.env.API_PORT ? parseInt(process.env.API_PORT) : 3000;
const connectionString = process.env.MONGO_CONNECTION ? process.env.MONGO_CONNECTION + "btc" : 'mongodb://user:pass@localhost:27017/btc' ;

const app = express();

const corsOptions = process.env.MONGO_CONNECTION == 'DEPLOYED' ? {
  origin: 'https://www.btcalerter.com',
  credentials: true,
} : {};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(connectionString, { authSource: 'admin' });
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB @ 27017');
});
mongoose.set('debug', true);

app.get('/', function(req, res, next) {
  res.sendStatus(200);
  return;
})

app.post('/user/signup', validateSignupParams, signup, generateAccessToken);

app.post('/user/login', validateLoginParams, login, generateAccessToken);

app.post('/alerts/add', validateToken, validateAlertParams, addAlert);

app.post('/alerts/list', validateToken, validateGetAlertsByUserIdParams, getAlertsByUserId);

app.listen(port, () => {
  console.log(`listening on ${port}`);
});
