const connection = require("../Connection");

class PostCategory {
    add(categoryId, postId) {
        return new Promise( (resolve, reject) => {
            connection.query(`
                                insert into post_has_category(Post_id, Category_id)
                                values(?,?)
                            `,[postId, categoryId], (err, res) => {
                                if(err) return reject(err);
                                return resolve(true)
                            })
        })
    }
}

const ps = new PostCategory();


module.exports = ps;
