const connection = require("../Connection");


class Category {
    constructor() {

    }

    getAll() {
        return new Promise( (resolve, reject) =>{
            connection.query("select id, name from category", (err, categoryes) => {
                if (err) return reject(err);
                return resolve(categoryes);
            })
        })
    }

    add(name) {
        return new Promise( (resolve, reject) => {
            connection.query(`
                                insert into category(name)
                                value(?)
                            `, [name], (err, result) => {
                                if(err) return reject(err);
                                return resolve(result);
                            })
        })
    }

    delete(id) {
        return new Promise( (resolve, reject) => {
            connection.query(`
                                delete from category where id = ?;
                            `, [id], (err, result) => {
                                if(err) return reject(err);
                                return resolve(result);
                            })
        })
    }
}


module.exports = new Category();