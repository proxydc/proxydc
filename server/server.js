const express = require("express");
const dbRoutes = require('./src/database/routes');
const app = express();
const PORT = 3000;
const cors = require('cors');

app.use(express.json());
app.use(cors({
    origin:  app.get("env") == "development"
    ? process.env.VUE_APP_SITEURLDEV : process.env.VUE_APP_SITEURLPROD,
}));

app.get("/", (req, res)=> {
    res.send("Hello Proxiad Backend!");
});

app.use("/api/v1/database", dbRoutes);

app.listen(PORT, function check(err)
{
    if(err)
    console.log("error");
    else
    console.log("started on port "+ PORT);
});