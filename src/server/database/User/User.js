const connection = require("../Connection");

class User {
    constructor() {
      
    }

    insertUser(login, password) {
        return new Promise( (resolve, reject) => {
            let date = new Date();
            const dbdate = `${new Date().getFullYear()}-${new Date().getMonth() + 1}-${date.getDate()} ${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}`;

            connection.query(
                `
                    insert into user(login, password, rating, dateRegistration)
                    values(?,?,?,?)
                `
                , [login, password, 0, dbdate], (err, result) => {
                    if(err) return reject(err);
                    return resolve(true);
                }
            )
        })
    }

    getAllUser() {
        return new Promise( (resolve, reject) => {
            connection.query("select * from user", (err, result) => {
                if(err) return reject(err);
                return resolve(result);
            })
        })
    }
}

module.exports = new User();
