import morgon from 'morgan';
import { logger } from '../utils/logger.utils.js';
import { envVars } from '../utils/env_vars.utils.js';

// create a child logger for morgan
const morganLogger = logger.child({ module: 'morgan' });

const devMorganMiddleware = morgon('dev', {
    stream: {
        write: message => morganLogger.http(message)
    }
});

const prodMorganMiddleware = morgon('combined', {
    stream: {
        write: message => morganLogger.http(message)
    }
});

export const morganMiddleware = envVars.NODE_ENV === 'development' ? devMorganMiddleware : prodMorganMiddleware;
