const mysql = require("mysql");

class Connection {
    constructor(){
        this.connection = undefined;
        this.getInstance();
    }

    getInstance() {
        if(!this.connection) {
            this.connection = mysql.createConnection({
                host     : process.env.DB_HOST,
                user     : process.env.DB_USER,
                password : process.env.DB_PASSWORD,
                database : process.env.DB_DATABASE
            });
            
            this.connection.connect();

            return this.connection;
        }

        return this.connection;
    }
}

const connect = new Connection(); 

module.exports = connect.getInstance();