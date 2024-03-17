
import winston from "winston";

//........... Create a logger instance for request logging
export const requestLogger = winston.createLogger({
    level: "info",
    format: winston.format.json(),
    defaultMeta: { service: "request-logging" },
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'request-logs.txt' }) 
    ]
});

//........ Create a logger instance for error logging
export const errorLogger = winston.createLogger({
    level: "error",
    format: winston.format.json(),
    defaultMeta: { service: "error-logging" },
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'error-logs.txt' }) 
    ]
});

//......... Middleware to log requests
export const requestLoggerMiddleware = async (req, res, next) => {
    if (!req.url.includes("signin")) {
        const logData = `${new Date().toString()} - ${req.url} - ${JSON.stringify(req.body)}`;
        requestLogger.info(logData);
    }
    next();
};


export default requestLoggerMiddleware;
