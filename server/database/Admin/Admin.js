const connection = require("../Connection");

class Admin {
    getAdmin(id) {
        return new Promise( (resolve, reject) => {
            connection.query("select login, photo from user where id = ?", [id], (err, admin) => {
                if(err) return reject(err);
                return resolve(admin[0]);
            })
        });
    }
}


const a = new Admin();

module.exports = a;