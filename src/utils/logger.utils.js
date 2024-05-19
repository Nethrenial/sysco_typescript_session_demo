import { createLogger, format, transports } from 'winston'
import { envVars } from './env_vars.utils.js'


const sharedConfig = [
    format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss.SSS A Z'
    }),
    format.errors({ stack: true }),
]

export const logger = createLogger({
    level: envVars.LOG_LEVEL,
    format: envVars.NODE_ENV === 'development' ?
        format.combine(
            ...sharedConfig,
            format.colorize({ all: true }),
            format.align(),
            format.printf(
                info => {
                    const isError = info.level.includes('error')
                    if(!isError) {
                        return `[${info.timestamp}] ${info.level}: ${info.message}`
                    } else {
                        const coloredStack = `${info.stack}`
                        return `[${info.timestamp}] ${info.level}: ${coloredStack}`
                    }
                }
            )
        )
        : format.combine(
            ...sharedConfig,
            format.json()
        ),
    transports: [
        new transports.Console()
    ]
})