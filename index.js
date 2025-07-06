const express = require("express");
const app = express();
const port = 3000;
const mysql = require("mysql");
const cors = require("cors");


app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((error) => {
    if(error) throw error;
    console.log("Connected to Database");
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post("/api/email", (req, res) => {
    const {email} = req.body;

    const sql = "INSERT INTO subscribers (email) VALUES (?)";

    db.query(sql, [email], (error, result) => {
        if(error){
            res.json({response : 'Database Error'});
        }
        if(result.length > 0){
            res.json({response : 'You have already subscribed'});
        }else{
            res.json({response : "Thank you for subscribing Ampte B Marak's blog!"})
        };
    });
});


app.listen(port, () => {
    console.log("App is running");
});