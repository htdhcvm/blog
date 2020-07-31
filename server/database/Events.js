const EventsEmitter = require("events");

const post = require("./Post/Post");
const PostCategory = require("./Post_has_category/PostCategory");
const FileManipulation = require("../configurationModules/FileManipulation");


class Events extends EventsEmitter {
    emitEvent(event, obj) {
        this.emit(event, obj);
    }
}


const event = new Events();


event.on("addPostEvent", (obj) => {

    post.addPost(obj.data)
        .then( postId => {
            PostCategory.add(+obj.data.data.categoryId, postId)
                .then( statusAddPC => {
                    FileManipulation.copyFiles("./src/img", "./public/assets/img")
                                .then( result => {
                                    if(result) obj.res.send({ 
                                        status : "ok",
                                        text : "Post successfully added"
                                    })
                                })
                }, err => {
                    console.log(err);
                })
        }, err => {
            console.log(err);
        })
})

module.exports = event;
