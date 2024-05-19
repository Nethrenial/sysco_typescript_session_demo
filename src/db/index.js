import Database from 'better-sqlite3';
import {envVars} from '../utils/index.js'

const db = new Database(envVars.DB_FILE);
db.pragma('journal_mode = WAL');

// create users table if not exists
db.prepare(`CREATE TABLE IF NOT EXISTS users(
    'id' INTEGER PRIMARY KEY AUTOINCREMENT,
    'first_name' VARCHAR,
    'last_name' VARCHAR,
    'email' VARCHAR UNIQUE,
    'address' VARCHAR,
    'created_at' DATETIME DEFAULT CURRENT_TIMESTAMP,
    'updated_at' DATETIME DEFAULT CURRENT_TIMESTAMP 
);`).run();

export {
    db
}