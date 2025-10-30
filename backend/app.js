const express = require("express");
const app = express()
const config = require("./config/config.json")
const port = config.server.port;
const getUrlPrefix = config.app.prefix;
const indexRouter = require("./routes/index")
const sequelize = require("./db/Mysql/connection");
const cors = require("cors");

//Middleware part
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/', indexRouter);

//server creation
const start = async () => {
    try {
        await sequelize.authenticate();
        console.log("Mysql Database Connected Successfully");
        app.listen(port, (req, res) => {
            console.log(`Server listening on port ${port}`);
            console.log(`Try with this url http://localhost:${port}${getUrlPrefix}`)
        })
    } catch (err) {
        console.log("Error While Connection TO Mysql DB", err);
        process.exit(1);
    }
}

start()

module.exports = app