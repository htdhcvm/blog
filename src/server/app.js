const   express       = require("express"),
        session       = require("express-session"),
        bodyParser    = require("body-parser"),
        passport      = require("passport"),
        bcrypt        = require("bcrypt"),
        flash         = require("flash");




// сделать класс configure
require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

const routes = require("./routes/routes");

app.set("view engine", "pug")

app.use('/js', express.static(process.cwd() + "/public/assets/js"));
app.use('/css', express.static(process.cwd() + "/public/assets/css"));
app.use('/img', express.static(process.cwd() + "/public/assets/img"));
app.use('/font', express.static(process.cwd() + "/public/assets/font"));

app.use(bodyParser.urlencoded({ extended : false }));

app.use(session({ 
    secret : process.env.SESSION_KEY,
    resave : false,
    saveUninitialized: true,
    cookie : {
        maxAge : 1 * 1000 * 60 * 60 * 0.1 // 10 min 
    }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use("/", routes);



app.listen(PORT, () => {
    console.log(`Server was started on ${PORT} port`)
})
