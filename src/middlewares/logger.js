import winston from "winston";
import __dirname from "../utils.js";
import { NODE_ENV } from "../config/config.js";

const customLevelOptions = {
  levels: {
    debug: 0,
    http: 1,
    info: 2,
    warning: 3,
    error: 4,
    fatal: 5,
  },
  colors: {
    debug: "white",
    http: "gray",
    info: "green",
    warning: "yellow",
    error: "red",
    fatal: "magenta",
  },
};

const developmentLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),
  ],
});

const productionLogger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.File({
      filename: `${__dirname}/../logs/errors.log`,
      level: "error",
      format: winston.format.simple(),
    }),
  ],
});

export const addLogger = (req, res, next) => {
  if (NODE_ENV === "production") {
    req.logger = productionLogger;
    req.logger.info(
      `${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`
    );
    next();
  }
  if (NODE_ENV === "development") {
    req.logger = developmentLogger;
    req.logger.debug(
      `${req.method} en ${req.url} - ${new Date().toLocaleDateString()}`
    );
    next();
  }
};
