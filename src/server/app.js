const express = require("express");
                require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

const routes = require("./routes/routes");

app.set("view engine", "pug")

app.use('/js', express.static(process.cwd() + "/public/assets/js"));
app.use('/css', express.static(process.cwd() + "/public/assets/css"));
app.use('/img', express.static(process.cwd() + "/public/assets/img"));
app.use('/font', express.static(process.cwd() + "/public/assets/font"));

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server was started on ${PORT} port`)
})
