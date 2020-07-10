const express = require("express");

const app = express();


app.use('/js', express.static(__dirname + "/dist"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/views/[filename].html")
})

app.listen(3000, () => {
    console.log("server was started on 3000 port")
})


