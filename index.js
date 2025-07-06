const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());


const db = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    connectTimeout: 10000
});



app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post("/api/email", (req, res) => {
    const {email} = req.body;

    const sql1 = "SELECT * FROM subscribers WHERE email = ?";

    db.query(sql1, [email], (error, result) => {
        if(error){
            return res.json({response : 'Database error'});
        }
        if(result.length > 0){
            return res.json({response : 'You have already subscribed'});
        }

            const sql2 = "INSERT INTO subscribers (email) VALUES (?)";
            db.query(sql2, [email], (error, result) => {
                if(error){
                    return res.json({response : "Database error"});
                }else{
                    return res.json({response : "Thank you for subscribing Ampte B Marak's blog!"});
                };
            });
    });
});


app.listen(port, () => {
    console.log("App is running");
});