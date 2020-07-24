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
}


module.exports = new Category();