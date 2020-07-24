const category      = require("../database/Category/Category");
const post          = require("../database/Post/Post");
const join          = require("../database/Join/Join");
const events        = require("../database/Events");

function getAuthDataOnAuth(req){
    if(req.isAuthenticated()) {
        return {
            status : true,
            name : req.session.passport.user.login
        }
    } else {
        return {
            status : false
        }
    }
}




class Controller {
    createPost(req, res) {
        events.emitEvent("addPostEvent", {
            data : {
                file : req.file,
                data : req.body,
                user : req.session.passport.user
            },
            res : res
        });
    }

    renderSearch(req, res) {
        res.render("pages/search");

    }

    renderSettings(req, res) {
        res.render("pages/settings");

    }

    renderChat(req, res) {
        res.render("pages/chat");

    }

    renderMain(req, res) {
        join.joinPostUserGetAllPost()
            .then( posts => {
                res.render("pages/main", {
                    connectionFiles : {
                        js : [
                            "/js/main.js"
                        ],
            
                        css : [
                            "/css/main.css"
                        ]
                    },
                    data : {
                        title : "Flouheforst",
                        auth : getAuthDataOnAuth(req),
                        post : posts
                    }
                })
            }, err => {
                console.log(err);
            });
    }

    renderPostHash(req, res) {
        join.joinPostUserGetPost(req.params.hash.replace("hash=", ""))
            .then(
                postD => {
                    console.log(postD)
                    res.render("pages/post", {
                        connectionFiles : {
                            js : [
                                "/js/post.js"
                            ],
                
                            css : [
                                "/css/post.css"
                            ]
                        },
                        data : {
                            title : "Flouheforst | Post",
                            auth : getAuthDataOnAuth(req),
                            postData : postD
                        }
                    })
                }, err => {
                    console.log(err);
                }
            )
    }

    renderWritePost(req, res) {
        category.getAll()
        .then(
            categoryes => {
                res.render("pages/write-post", {
                    connectionFiles : {
                        js : [
                            "/js/writePost.js"
                        ],
            
                        css : [
                            "/css/writePost.css"
                        ]
                    },
                    data : {
                        title : "Flouheforst | Write-post",
                        categoryes : categoryes
                    }
                })
            },
            err => {
                throw new Error(err)
            }
        ).catch(err => {
            console.log(err)
        })
    }

    renderLogout(req, res) {
        req.logout();
        res.redirect("/")
    }

    renderSignIn(req, res) {
        res.render("pages/signin", {
            connectionFiles : {
                js : [
                    "/js/signin.js"
                ],
    
                css : [
                    "/css/signin.css"
                ]
            },
            data : {
                title : "Flouheforst | SignIn",
                errors : req.flash("error")[0]
            }
        })
    }

    renderSignUp(req, res) {
        res.render("pages/signup", {
            connectionFiles : {
                js : [
                    "/js/signup.js"
                ],
    
                css : [
                    "/css/signup.css"
                ]
            },
            data : {
                title : "Flouheforst | SignUp",
                errors : req.flash("error")[0]
            }
        })
    }
}



let c = new Controller();

module.exports = c;