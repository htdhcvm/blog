const express = require("express");
const path = require("path");
const router = express.Router();


router.get("/", (req, res) => {
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
            templateToLoad : path.join( process.cwd(), "views/layout/basik.pug" )
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

router.get("/search", (req, res) => {
    res.render("pages/search")
});

router.get("/settings", (req, res) => {
    res.render("pages/settings")
});

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
            title : "Flouheforst | SignIn"
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
            title : "Flouheforst | SignUp"
        }
    })
});

module.exports = router;