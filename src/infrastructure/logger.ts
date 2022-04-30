import winston from 'winston';
const { combine, splat, timestamp, printf } = winston.format;

interface Logger {
  info(data: string, context?: unknown): void;
  error(data: string, context?: unknown): void;
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = ('0' + String(date.getMonth() + 1)).slice(-2);
  const day = ('0' + String(date.getDate())).slice(-2);
  const hour = date.getHours();
  const minute = date.getMinutes();
  const seconds = date.getSeconds();

  return `${year}-${month}-${day} ${hour}:${minute}:${seconds}`;
};

const logFormat = printf(({ level, message, timestamp, ...metadata }) => {
  let msg = `[${level}] ${formatDate(new Date(timestamp as string))} ${message} `;
  if (metadata) {
    const meta = JSON.stringify(metadata);
    if (meta !== '{}') msg += `\n ${meta}`;
  }
  return msg;
});

const winstonLogger = winston.createLogger({
  exitOnError: false,
  level: 'info',
  format: combine(winston.format.colorize(), splat(), timestamp(), logFormat),
  transports: [new winston.transports.Console()],
});

const makeLogger = (): Logger => {
  const info = (data: string, ...context: unknown[]): void => {
    winstonLogger.info(data, context);
  };
  const error = (data: string, ...context: unknown[]): void => {
    winstonLogger.error(data, context);
  };
  return {
    info,
    error,
  };
};

const logger = makeLogger();

export { logger, Logger };
