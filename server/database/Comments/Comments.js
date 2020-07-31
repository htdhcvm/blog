const connection = require("../Connection");
const md5 = require("md5-nodejs");

class Comments {
    addComment( text, user_id, hash){
        let date = new Date();
        const dbdate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

        if(user_id) {
            return new Promise( (resolve, reject) => {
                connection.query("select id from post", (err, ids) => {
                    resolve(ids);
                })
            }).then( ids => {
                let needId = "";
        
                ids.forEach( idD => {
                    if( md5(idD.id) == hash ) needId += idD.id;
                })
        
                return needId;
            }).then( needPostId => {
                return new Promise( (resolve, reject) => {
                    connection.query(`
                                        insert into comment(text, date, User_id, Post_id)
                                        value(?,?,?,?)
                                    `, [text, dbdate, user_id, needPostId], (err, res) => {
                                        if(err) return reject(err);
                                        return resolve(res)
                                    })
                });
            })
        } else {
            return new Promise( (resolve, reject) => {
                connection.query("select id from post", (err, ids) => {
                    resolve(ids);
                })
            }).then( ids => {
                let needId = "";
        
                ids.forEach( idD => {
                    if( md5(idD.id) == hash ) needId += idD.id;
                })
        
                return needId;
            }).then( needPostId => {
                return new Promise( (resolve, reject) => {
                    connection.query(`
                                        insert into comment(text, date, Post_id)
                                        value(?,?,?)
                                    `, [text, dbdate, needPostId], (err, res) => {
                                        if(err) return reject(err);
                                        return resolve(res)
                                    })
                });
            })
        }
    }





}

const c = new Comments();

module.exports = c;