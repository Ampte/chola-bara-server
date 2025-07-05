const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((error) => {
    if(error){
        console.log("Cannot connect to database");
    }else{
        console.log("Connected to database");
    };
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.listen(port, () => {
    console.log("App is running");
});