import {config} from 'dotenv'
config()



export const envVars = {
    PORT: Number(process.env.PORT || 3000),
    NODE_ENV: process.env.NODE_ENV,
    LOG_LEVEL: process.env.NODE_ENV === 'development' ? 'silly' : 'http',
    DB_FILE: process.env.DB_FILE || 'db.sqlite'
}
