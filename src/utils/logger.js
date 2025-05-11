const winston = require('winston');
const { format, transports, createLogger } = winston;
const { combine, timestamp, printf, colorize } = format;
const fs = require('fs');
const path = require('path');
const colorette = require('colorette');
const dayjs = require('dayjs');

// Load config or fallback to defaults
const LOG_CONFIG_PATH = path.resolve(__dirname, '../config/logger.config.json');
let config;

try {
  const data = fs.readFileSync(LOG_CONFIG_PATH, 'utf8');
  config = JSON.parse(data);
} catch (err) {
  console.warn('Logger config not found. Using defaults.');
  config = {
    level: 'silly',
    transports: {
      console: {
        level: 'silly',
        colorize: true
      },
      file: {
        level: 'error',
        filename: 'logs/app.log'
      }
    }
  };
}

// Ensure logs directory exists

// Custom log format
// const logFormat = printf(({ level, message, timestamp, logger }) => {
//   return `${timestamp} [${level.toUpperCase().padEnd(5)}] ${logger ? `[${logger}] ` : ''}${message}`;
// });
// Custom log format that includes the logger name


// Create a shared formatter

// Shared logger instance pool
const loggers = {};

class Logger {
  constructor(context) {

    const logDir = path.dirname(path.resolve(process.cwd(), config.transports.file.filename));
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true });
    }

    console.log("context", context);
    const key = context || 'default';

    if (loggers[key]) {
      this.logger = loggers[key];
      this.loggerName = key;
      return this;
    }

    this.loggerName = key;
    console.log(this.loggerName)

    const logFormat = printf(({ level, message, logger, timestamp }) => {
      // console.log("timestamp", timestamp)
      const coloredLevel = (() => {
        switch (level) {
          case 'error': return colorette.red(level.toUpperCase());
          case 'warn': return colorette.yellow(level.toUpperCase());
          case 'info': return colorette.cyan(level.toUpperCase());
          case 'http': return colorette.green(level.toUpperCase());
          case 'verbose': return colorette.blue(level.toUpperCase());
          case 'debug': return colorette.bgCyan(level.toUpperCase());
          case 'silly': return colorette.gray(level.toUpperCase());
          default: return level.toUpperCase();
        }
      })();

      return `${timestamp} [${logger || 'unknown'}] [${level}] ${message}`;
    });

    const baseFormat = combine(
      timestamp({
        format: () => dayjs().format('YYYY-MM-DD HH:mm:ss')
      }),
      format((info) => {
        // Set the `logger` field for use in logFormat
        // console.log(this.loggerName)
        info.logger = this?.loggerName || 'unknown';
        return info;
      })(),
      logFormat
    );

    // Create transports dynamically
    const getTransports = () => {
      const t = [];

      if (config.transports.console) {
        const consoleTransport = new transports.Console({
          level: config.transports.console.level || 'info',
          format: combine(
            colorize(),
            baseFormat
          )
        });
        t.push(consoleTransport);
      }

      if (config.transports.file && config.transports.file.filename) {
        const fileTransport = new transports.File({
          filename: path.resolve(process.cwd(), config.transports.file.filename),
          level: config.transports.file.level || 'error',
          format: baseFormat
        });
        t.push(fileTransport);
      }

      return t;
    };


    this.logger = createLogger({
      level: config.level || 'debug',
      levels: winston.config.npm.levels,
      transports: getTransports()
    });

    // Add logger to cache
    loggers[key] = this.logger;

    return this;
  }

  // Proxy methods
  debug(message) {
    console.log("hello");
    this.logger.debug(message, { logger: this.loggerName });
  }

  info(message) {
    this.logger.info(message, { logger: this.loggerName });
  }

  warn(message) {
    this.logger.warn(message, { logger: this.loggerName });
  }

  error(message, meta) {
    if (meta instanceof Error) {
      this.logger.error(`${message}: ${meta.stack}`, { logger: this.loggerName });
    } else {
      this.logger.error(message, { ...meta, logger: this.loggerName });
    }
  }

  verbose(message) {
    this.logger.verbose(message, { logger: this.loggerName });
  }

  silly(message) {
    this.logger.silly(message, { logger: this.loggerName });
  }
}

module.exports = Logger;