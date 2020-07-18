const express = require("express");
const path = require("path");
const passport = require("../configurationModules/Passport");
require('dotenv').config();

const router = express.Router();

router.get("/search", (req, res) => {
    res.render("pages/search");
});

router.get("/settings", (req, res) => {
    res.render("pages/settings");
});

router.get("/chat", (req, res) => {
    res.render("pages/chat");
});


router.post("/auth", passport.pass.authenticate("local-signin",  {successRedirect: '/', failureRedirect: "/signin",  failureFlash: true})); 

router.post("/registration", passport.pass.authenticate("local-signup", {successRedirect: '/', failureRedirect: "/signup",  failureFlash: true}));

router.get("/", (req, res) => {
    let authData = {};
    if(req.isAuthenticated()) {
        authData = {
            status : true,
            name : req.session.passport.user
        }
    } else {
        authData = {
            status : false
        }
    }
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
            templateToLoad : path.join( process.cwd(), "views/layout/basik.pug" ),
            auth : authData
        }
    })
});

router.get("/post", (req, res) => {
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
            title : "Flouheforst | Post"
        }
    })
});

// function checkAuth(req, res, next){
//     if(req.isAuthenticated()) {
//         return next();
//     }
//     return res.redirect("/")
// }

router.get("/write-post", (req, res) => {
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
            title : "Flouheforst | Write-post"
        }
    })
});



router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/")
})

router.get("/signin", (req, res) => {
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
});

router.get("/signup", (req, res) => {
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
});

module.exports = router;
