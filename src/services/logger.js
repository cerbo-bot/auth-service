// log setup
import * as winston from 'winston';
import appRoot from 'app-root-path';

const options = {
  file: {
    level: 'info',
    filename: `${appRoot}/logs/app.log`,
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    format: winston.format.combine(
      winston.format.colorize({ all: true }),
      winston.format.splat(),
      winston.format.printf((info) => {
        if (typeof info.message === 'object') {
          /* eslint-disable no-param-reassign */
          info.message = JSON.stringify(info.message, null, 3);
          /* eslint-enable no-param-reassign */
        }
        return `[${info.level}] : ${info.message}`;
      })
    ),
  },
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false, // do not exit on handled exceptions
});

// logger.stream = {
//   write(message) {
//     logger.info(message);
//   },
// };

export default logger;
