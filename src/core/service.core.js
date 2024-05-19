import { db } from "../db/index.js"
import { logger } from "../utils/index.js"

export class Service {
    db = db
    logger = logger
}