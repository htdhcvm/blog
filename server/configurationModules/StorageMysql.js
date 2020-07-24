const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);
require("dotenv").config();

class StorageMysql {
    constructor() {
        let options = {
            host: process.env.DB_HOST,
            port: +process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_DATABASE,
            clearExpired: true,
            expiration:  +process.env.SESSION_COOKIE_AGE, 
            createDatabaseTable: true,
            charset: "utf8mb4_bin",
            schema: {
                tableName: "sessions",
                columnNames: {
                    session_id: "session_id",
                    expires: "expires",
                    data: "data"
                }
            }
        };

        this.sessionStore = new MySQLStore(options);
    }
}



module.exports = new StorageMysql();