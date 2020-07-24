const connection = require("../Connection");

class User {
    constructor() {
      
    }

    insertUser(login, password) {
        return new Promise( (resolve, reject) => {
            let date = new Date();
            const dbdate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;


            connection.query(
                `
                    insert into user(login, password, rating, dateRegistration)
                    values(?,?,?,?)
                `
                , [login, password, 0, dbdate], (err, result) => {
                    if(err) return reject(err);
                    return resolve(result);
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
