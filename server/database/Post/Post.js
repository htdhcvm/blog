require('dotenv').config();
const connection = require("../Connection");
const { v4 } = require("uuid");
const bcrypt = require("bcrypt");
const md5 = require('md5-nodejs');

class Post{
    addPost(dataPost){
        return new Promise( (resolve, reject ) => {
            let query = ``;
            let date = new Date();
            const dbdate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
            let _id = v4();
            const hash = md5(_id);
            if(dataPost.file) {

            
                query = `
                            insert into post(id, title, description, photo, rating, dateCreate, User_id, hash, status)
                            values(?, ?, ?, ?, ?, ?, ?, ?, ?)
                        `;
                connection.query(query, [_id, dataPost.data.title, dataPost.data.text, `\\img\\${dataPost.file.filename}`, 0, dbdate, dataPost.user.id, hash, 0], (err, result) => {
                    if(err) return reject(err);
                    return resolve(_id);
                });
            } else {
                query = `
                            insert into post(id, title, description, rating, dateCreate, User_id, hash, status)
                            values(?, ?, ?, ?, ?, ?, ?, ?)
                        `;
                connection.query(query, [_id, dataPost.data.title, dataPost.data.text, 0, dbdate, dataPost.user.id, hash, 0], (err, result) => {
                    if(err) return reject(err);
                    return resolve(_id);
                });
            }
           
        })
    }

    getAllPost() {
        return new Promise( (resolve, reject) => {
            connection.query("select id, title, description, photo, dateCreate, hash, status from post", (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            })
        })
    }

  

    getPost(id){
        return new Promise( (resolve, reject) => {
            connection.query(`
                                select title, description, photo, dateCreate, rating from post
                                where id = ?
                            `,[id], (err, post) => {
                                if(err) return reject(err);
                                return resolve(post[0])
                            })
        })
    }

    changeStatus(status, hash) {
        status = ( status == 0 ) ? 1 : 0;
        return new Promise( (resolve, reject) => {
            connection.query(`
                                update post set status = ? where hash = ?;
                            `,[status, hash], (err, post) => {
                                if(err) return reject(err);
                                return resolve(post[0])
                            })
        })
    }


    getPostOnHash(hash) {
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
                                select * from post where id = ?
                            `, [needPostId], (err, post) => {
                                if(err) return reject(err);
                                return resolve(post[0])
                            })
                });
        })
    }
}

const post = new Post();

module.exports = post;
