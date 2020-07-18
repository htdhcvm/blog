const   express       = require("express");
const   configure     = require("./configurationModules/Configure");

        require('dotenv').config();

const PORT = process.env.PORT || 3000;

const app = express();

const routes = require("./routes/routes");


const Config = new configure(app, express);
app.use("/", routes);



app.listen(PORT, () => {
    console.log(`Server was started on ${PORT} port`)
})
