const   category      = require("../database/Category/Category"),
        post          = require("../database/Post/Post"),
        join          = require("../database/Join/Join"),
        admin         = require("../database/Admin/Admin"),
        comments      = require("../database/Comments/Comments"),
        events        = require("../database/Events"),
        user          = require("../database/User/User"),
        helpers       = require("../helpers/helpers"),
        bcrypt        = require("bcrypt");

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

    checkAuth( req, res, next) {
        if(req.isAuthenticated()) {
            return next();
        }
        return res.redirect("/")
    }

    checkAuthAdmin(req, res, next) {
        if( !helpers.isEmptyObj(req.session.passport) ) {
            if ( req.session.passport.user.type == "admin") {
                return next();
            }
        } else {
            return res.redirect("/");
        }
        return res.redirect("/")
    }

    renderSettings(req, res) {
        user.getDataOnlogin(req.params.login)
            .then( dataUser =>{
                join.joinUserPost(req.params.login)
                    .then( listPost => {
                        res.render("pages/settings", {
                            connectionFiles : {
                                js : [
                                    "/js/settings.js"
                                ],
                    
                                css : [
                                    "/css/settings.css"
                                ]
                            },
                            data : {
                                title : "Settings",
                                dataUser : dataUser,
                                listPost : listPost
                            }
                        });
                    }, err => {
                        throw err;
                    }).catch(err => {
                        console.log(err);
                    }) 
            }, err => {
                throw err;
            }).catch(err => {
                console.log(err);
            }) 
    }

    renderChat(req, res) {
        res.render("pages/chat");
    }

    renderSearch(req, res) {
        res.render("pages/search");
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
                        auth : helpers.getAuthDataOnAuth(req),
                        post : posts
                    }
                })
            }, err => {
                console.log(err);
            });
    }

    renderPostHash(req, res) {
        console.log(req.params.hash.replace("hash=", ""))
        join.joinPostUserGetPost(req.params.hash.replace("hash=", ""))
            .then(
                postD => {
                    join.getCommentOnPostId(postD.id)
                        .then( comments => {
                            console.log(comments);
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
                                    auth : helpers.getAuthDataOnAuth(req),
                                    postData : {
                                        postD : postD,
                                        commet : comments
                                    }
                                }
                            })
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

    renderAuthAdmin(req, res) {
        res.render("pages/authadmin", {
            connectionFiles : {
                js : [
                    "/js/signin.js"
                ],
    
                css : [
                    "/css/signin.css"
                ]
            },
            data : {
                title : "Flouheforst | AdminSignIn",
                errors : req.flash("error")[0]
            }
        });
    }

    renderAdmin(req, res) {
        admin.getAdmin(req.session.passport.user.id)
            .then( admin => {
                res.render("pages/admin", {
                    connectionFiles : {
                        js : [
                            "/js/admin.js"
                        ],
            
                        css : [
                            "/css/admin.css"
                        ]
                    },
                    data : {
                        title : "Flouheforst | Admin",
                        admin : admin,
                        typeData : "dashboard"
                        
                    }
                });
            }, err => {
                res.redirect("/");
            })
    }

    renderAdminPost(req, res) {
        admin.getAdmin(req.session.passport.user.id)
            .then( admin => {
                post.getAllPost()
                    .then( posts => {

                        res.render("pages/adminPost", {
                            connectionFiles : {
                                js : [
                                    "/js/adminPost.js"
                                ],
                    
                                css : [
                                    "/css/adminPost.css"
                                ]
                            },
                            data : {
                                title : "Flouheforst | AdminPost",
                                admin : admin,
                                posts : posts,
                                typeData : "posts"
                            }
                        });
                    })
                
            });
    }

    renderAdminCategory(req, res) {
        admin.getAdmin(req.session.passport.user.id)
            .then( admin => {
                category.getAll()
                .then( categories => {
                    res.render("pages/adminCategory", {
                        connectionFiles : {
                            js : [
                                "/js/adminCategory.js"
                            ],
                
                            css : [
                                "/css/adminCategory.css"
                            ]
                        },
                        data : {
                            title : "Flouheforst | AdminCategory",
                            admin : admin,
                            categories : categories,
                            typeData : "category"
                        }
                    });
                })
                
            });
    }

    categoryAdd(req, res) { 
        const categoryName = req.body.category;
        category.add(categoryName)
            .then((result) => {
                res.send({
                    status : "ok",
                    data : result.insertId
                })
            }, err => {
                throw err;
            }).catch(err => {
                console.log(err);
                res.send({
                    status : "err"
                })
            })
    }


    categoryDelete(req, res) {
        const id = req.body.idCategory;

        category.delete(id)
            .then( result => {
                res.send({
                    status : "success"
                })
            }, err => {
                throw err;
            }).catch( err => {
                res.send({
                    status : "err",
                    errMsg : "Can't delete category"
                })
            })
    }


    renderAdminChangeStatusPost( req, res) {
        let { status, hash } = req.body;

        post.changeStatus(status, hash)
            .then( result => {
                res.send({
                    status : "success"
                })
            }, err => {
                throw err;
            }).catch(err => {
                res.send({
                    status : "err",
                    errMsg : "Can't change status post"
                })
            })
    }


    renderAdminPostHash(req, res) {
        let hash = req.params.hash.replace("hash=", "");

        post.getPostOnHash(hash)
            .then( postD => {
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
                        auth : helpers.getAuthDataOnAuth(req),
                        postData : postD
                    }
                })
            }, (err) => {
                throw err;
            }).catch( err => {
                console.log(err);
            }) 
    }


    createComment(req, res) {
        let { text, hash } = req.body;
        if( !helpers.isEmptyObj(req.session.passport )) {
            let user_id = req.session.passport.user.id;
            comments.addComment(text, user_id, hash)
                .then(
                    result => {
                        res.send({
                            status : "success"
                        })
                    }, err => {
                        throw err;
                    }
                ).catch( err => {
                    console.log(err);
                    res.send({
                        status : "error",
                        errMsg : "Can't add comment for post"
                    })
                })
        } else {
            comments.addComment(text, undefined, hash)
                .then(
                    result => {
                        res.send({
                            status : "success"
                        })
                    }, err => {
                        throw err;
                    }
                ).catch( err => {
                    console.log(err);
                    res.send({
                        status : "error",
                        errMsg : "Can't add comment for post"
                    })
                })
        }
    }

    changePassword(req, res) {
        let { oldPassword, newPassword } = req.body;

        bcrypt.compare(oldPassword, req.session.passport.user.password, (err, result) => {
            if(result) {
                bcrypt.hash( newPassword,  +process.env.SALT, (err, hash) => {
                    if (err) return res.send({
                        status : "error",
                        msgErr : "Something was wrong"
                    });

                    user.updateUserPassword(req.session.passport.user.id, hash)
                        .then( success => {
                            req.session.passport.user.password = hash;
                            res.send({
                                status : "success",
                                msg : "Success update password"
                            })
                        }, err => {
                            throw err;
                        }).catch( e => {
                            console.log(e);
                        })

                })
            } else {
                return res.send({
                    status : "error",
                    msgErr : "Old password don't equal corrent password"
                })
            }
        })      
    }

    updateProfile(req, res) {
        let { fio, date_birthday, address, phone } = req.body;
        user.updateUser(req.session.passport.user.id, fio, date_birthday, address, phone)
            .then( result => {
                res.send({
                    status : "success",
                    msg : "Success update"
                })
            }, err => {
                throw err;
            }).catch( err => {
                console.log(err);
                res.send({
                    status : "err",
                    msgErr : "Error : Something went wrong"
                })
            })
    }



    // todo
    renderUser(req, res) {
        let login = req.params.login;
        user.getDataOnlogin(login)
            .then( user => {
                join.getPostOnUserLoginStatus(login)
                    .then( posts => {
                        res.render("pages/userPage", {
                            connectionFiles : {
                                js : [
                                    "/js/userPage.js"
                                ],
                    
                                css : [
                                    "/css/userPage.css"
                                ]
                            },
                            data : {
                                title : "Flouheforst",
                                user : user,
                                posts : posts
                            }
                        })
                    })
            })

    }
}

let c = new Controller();

module.exports = c;
