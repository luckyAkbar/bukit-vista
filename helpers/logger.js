require("dotenv").config();

const pino = require("pino");
const expressPinoLogger = require("express-pino-logger");

const logger = pino({
  level: process.env.LOG_LEVEL,
});

const loggerMiddleware = expressPinoLogger({
  logger,
  autoLogging: true,
});

module.exports = {
  logger,
  loggerMiddleware,
};
