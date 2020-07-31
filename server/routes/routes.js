                        require('dotenv').config();
const   express       = require("express"),
        multer        = require("../configurationModules/Multer"),
        passport      = require("../configurationModules/Passport"),
        controller    = require("../controller/Controller");

const router = express.Router();

router.get("/", controller.renderMain);

router.get("/search", controller.renderSearch);

router.get("/settings/:login", controller.checkAuth, controller.renderSettings);

router.get("/chat", controller.renderChat);

router.get("/post/:hash", controller.renderPostHash);

router.get("/write-post", controller.checkAuth, controller.renderWritePost);

router.get("/logout", controller.checkAuth, controller.renderLogout)

router.get("/signin", controller.renderSignIn);

router.get("/signup", controller.renderSignUp);

router.get("/user/:login", controller.renderUser);

router.post("/create-comment", controller.createComment);

router.post("/create-post", multer.single("image"), controller.createPost);

router.post("/auth", passport.pass.authenticate("local-signin",  {successRedirect: '/', failureRedirect: "/signin",  failureFlash: true})); 

router.post("/registration", passport.pass.authenticate("local-signup", {successRedirect: '/', failureRedirect: "/signup",  failureFlash: true}));

router.post("/settings/changePassword", controller.checkAuth, controller.changePassword );

router.post("/settings/updateProfile", controller.checkAuth, controller.updateProfile );



router.get("/auth-admin", controller.renderAuthAdmin);

router.post("/auth-admin", passport.pass.authenticate("local-signin-admin", {successRedirect: '/admin', failureRedirect: "/auth-admin",  failureFlash: true}));

router.get("/admin", controller.checkAuthAdmin, controller.renderAdmin);

router.get("/admin/post", controller.checkAuthAdmin, controller.renderAdminPost);

router.get("/admin/post/:hash", controller.checkAuthAdmin, controller.renderAdminPostHash);

router.post("/admin/post/changeStatus", controller.checkAuthAdmin, controller.renderAdminChangeStatusPost);

router.get("/admin/category", controller.checkAuthAdmin, controller.renderAdminCategory);

router.post("/admin/category/add", controller.checkAuthAdmin, controller.categoryAdd);

router.post("/admin/category/delete", controller.checkAuthAdmin, controller.categoryDelete);

module.exports = router;
