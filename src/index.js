import express from 'express'
import { envVars, logger } from './utils/index.js'
import { morganMiddleware } from './middlewares/index.js'
import { controllers } from './controllers/index.js'

const app = express();
app.use(express.json())
// setup http request logging
app.use(morganMiddleware)

// register all controllers
for (const [route, controller] of Object.entries(controllers)) {
    app.use(`/${route}`, controller)
}



app.listen(envVars.PORT, () => {
    logger.info(`[Server]: Started listening on http://localhost:${envVars.PORT}`)
})
