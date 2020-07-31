const connection = require("../Connection");
const md5 = require("md5-nodejs");
class Join {
    joinPostUserGetAllPost() {
        return new Promise( (resolve, reject) => {
            connection.query(
                `
                select u.login, u.dateRegistration, p.hash, p.title, p.description, p.photo, p.dateCreate, p.rating, c.name
                    from post p
                        inner join user u
                            on p.User_id = u.id
                        inner join post_has_category ps
                            on p.id = ps.Post_id
                        inner join category c
                            on ps.Category_id = c.id
                        where p.status = 1;
                `, (err, result) => {
                if (err) return reject(err);
                return resolve(result);
            })
        })
        
    }
    
    joinPostUserGetPost(hash){
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
                                select u.login, u.dateRegistration, p.title, p.description, p.photo, p.dateCreate, p.rating, p.hash, p.id
                                    from post p
                                        inner join user u
                                            on p.User_id = u.id
                                            where p.id = ?;
                            `, [needPostId], (err, post) => {
                                if(err) return reject(err);
                                return resolve(post[0])
                            })
                });
        })
    }

    getCommentOnPostId(id){
        return new Promise( (resolve, reject) => {
            connection.query(`
                                select c.text, c.date, u.login 
                                from comment c
                                inner join user u
                                on c.User_id = u.id
                                where Post_id=?;
                            `, [id], (err, res) => {
                                if(err) return reject(err);
                                return resolve(res)
                            })
        }) 
    }

    joinUserPost( login ){
        return new Promise( (resolve, reject) => {
            connection.query(`
                            select p.hash, u.login, p.title, p.description, p.photo, p.status
                                from user u 
                                    inner join post p
                                    on p.User_id = u.id
                                        where login = ?;
                            `, [login], (err, result) => {
                                if(err) return reject(err);
                                return resolve(result);
                            })
        })
        
    }


    getPostOnUserLoginStatus( login ) {
        return new Promise( (resolve, reject) => {
            connection.query(`
                            select p.hash, u.login, p.title, p.description, p.photo, p.status
                                from user u 
                                    inner join post p
                                    on p.User_id = u.id
                                        where login = ? and p.status = 1;
                            `, [login], (err, result) => {
                                if(err) return reject(err);
                                return resolve(result);
                            })
        })
    }
}

const j = new Join();

module.exports = j;
