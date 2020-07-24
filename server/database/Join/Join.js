const connection = require("../Connection");




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
                                select u.login, u.dateRegistration, p.title, p.description, p.photo, p.dateCreate, p.rating
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
}

const j = new Join();


module.exports = j;
