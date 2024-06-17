import * as winston from "winston";

const { combine, timestamp, label, printf, colorize } = winston.format;

const tsFormat = () => new Date().toLocaleTimeString();

const myFormat = printf(({ level, message }) => {
    return `${tsFormat()} ${level}: ${message}`;
});

const filterFormat = winston.format((info) => {
    const err = {
        ...info,
        level: info.level,
        message: info.message,
        timestamp: info.timestamp,
    };

    if (info.response) {
        err.message += `, Description: ${info.response.statusText}`;
        if (info.response.data && info.response.data.message) {
            err.message += `, Message: ${info.response.data.message}`;
        }

        return err;
    }

    return err;
});

const console = new winston.transports.Console({
    level: "debug",
});

const exceptions = new winston.transports.Console({
    level: "debug",
});

const logger = winston.createLogger({
    levels: winston.config.syslog.levels,
    format: combine(
        colorize(),
        label({ label: "" }),
        timestamp(),
        filterFormat(),
        myFormat
    ),
    transports: [console],
    exceptionHandlers: [exceptions],
});

winston.addColors(winston.config.npm.colors);

logger.on("error", () => {
    /* Do Something */
    // Sending slack logs
    // Sending email logs
});

export { logger };
