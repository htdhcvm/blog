const   session       = require("express-session"),
        bodyParser    = require("body-parser"),
        passport      = require("passport"),
        StorageMysql  = require("./StorageMysql"),
        flash         = require("connect-flash");




class Configure {
    constructor(app, express) {
        app.set("view engine", "pug")
        app.use("/js", express.static(process.cwd() + "/public/assets/js"));
        app.use("/css", express.static(process.cwd() + "/public/assets/css"));
        app.use("/img", express.static(process.cwd() + "/public/assets/img"));
        app.use("/font", express.static(process.cwd() + "/public/assets/font"));
        
        app.use(bodyParser.json({ type: "application/json" }));
        app.use(bodyParser.urlencoded({ extended : false }));

        app.use(session({ 
            secret : process.env.SESSION_KEY,
            store : StorageMysql.sessionStore,
            resave : false,
            saveUninitialized: true
        }));

        app.use(passport.initialize());
        app.use(passport.session());
        app.use(flash());
    }
}

module.exports = Configure;
