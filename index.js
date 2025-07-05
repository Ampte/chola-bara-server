const express = require("express");
const app = express();
const port = 3000;


app.get("/", (req, res) => {
    res.sendFile(__dirname + "index.hmtl");
});


app.listen(port, () => {
    console.log("App is running");
});