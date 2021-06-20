import morgan, { StreamOptions } from 'morgan';
import { env } from 'process';
import Logger from '../utils/logger';

const stream: StreamOptions = {
    write: (message) => Logger.http(message),
};

const skip = () => {
    return (env.NODE_ENV || "development") !== "development";
};

const loggerMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
)

export default loggerMiddleware;