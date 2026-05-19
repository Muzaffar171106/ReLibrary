const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
///goo
const routes = require('./routes/index');

const errorMiddleware = require(
  './middlewares/error.middleware'
);

const app = express();

app.use(cors());

app.use(helmet());

app.use(compression());

app.use(express.json());

app.use(express.urlencoded({
  extended: true,
}));

app.use(cookieParser());

app.use(morgan('dev'));

app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'MLMS API Running',
  });
});

const rateLimit = require(
  'express-rate-limit'
);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: 'Too many requests',
  },
});

app.use(limiter);

app.use('/api/v1', routes);

app.use(errorMiddleware);

module.exports = app;