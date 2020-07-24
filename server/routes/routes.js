                      require('dotenv').config();
const express       = require("express");
const multer        = require("../configurationModules/Multer");
const passport      = require("../configurationModules/Passport");
const controller    = require("../controller/Controller");

const router = express.Router();

router.post("/create-post", multer.single("image"), controller.createPost)

router.post("/auth", passport.pass.authenticate("local-signin",  {successRedirect: '/', failureRedirect: "/signin",  failureFlash: true})); 

router.post("/registration", passport.pass.authenticate("local-signup", {successRedirect: '/', failureRedirect: "/signup",  failureFlash: true}));

function checkAuth(req, res, next){
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/")
}

router.get("/search", controller.renderSearch);

router.get("/settings", controller.renderSettings);

router.get("/chat", controller.renderChat);

router.get("/", controller.renderMain);

router.get("/post/:hash", controller.renderPostHash);

router.get("/write-post", checkAuth, controller.renderWritePost);

router.get("/logout", checkAuth, controller.renderLogout)

router.get("/signin", controller.renderSignIn);

router.get("/signup", controller.renderSignUp);

module.exports = router;
