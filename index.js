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
    if(error) throw error;
    console.log("Connected to Database");

    const sql = "CREATE TABLE subscribers (id INT AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255))";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log("Table created");
    });
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.listen(port, () => {
    console.log("App is running");
});