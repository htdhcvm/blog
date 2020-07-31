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
                    insert into user(login, password, rating, dateRegistration, type)
                    values(?,?,?,?, ?)
                `
                , [login, password, 0, dbdate, "user"], (err, result) => {
                    if(err) return reject(err);
                    return resolve(result);
                }
            )
        })
    }

    updateUserPassword(id, password) {
        return new Promise( (resolve, reject) => {
            connection.query(`
                            update user set password = ? where id = ?
                        `, [password, id], (err, res) => {
                            if(err) return reject(err);
                            return resolve(res);
                        })
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

    getDataOnlogin(login) {
        return new Promise( (resolve, reject) => {
            connection.query(`
                                select login, photo, dateRegistration from user where login = ?;
                            `, [login], (err, result) => {
                                if(err) return reject(err);
                                return resolve(result[0]);
                            })
        })
    }

    updateUser(id, fio, dateBirthday, address, phone) {
        console.log(id, fio, dateBirthday, address, phone);
        return new Promise( (resolve, reject) => {
            connection.query(`
                                update user set fio = ?, dateBirthday = ?, address = ?, phone = ? where id = ?
                            `, [fio, dateBirthday, address, phone, id], (err, result) => {
                                if(err) return reject(err);
                                return resolve(result[0]);
                            })
        })
    }
}

module.exports = new User();
