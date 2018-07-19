const express = require('express');
const path = require ('path');
const mysql = require('mysql');

var app = express();

app.use(express.static(__dirname ));


//FE
app.get('/', function (req, res) {
    res.sendFile('Card.html', {root: path.join(__dirname, './public/html')});
});

app.get('/test', function (req, res) {
    res.sendFile('test.html', {root: path.join(__dirname, './public/html')});
});

app.get('/login', function (req, res) {
    res.sendFile('Login.html', {root: path.join(__dirname, './public/html')});
});

//DB
var con = mysql.createConnection({
    host: "mysql://mysql:3306",
    user: "peter",
    password: "peter",
    database: "sekera"
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE card (card_id INT(10), card_name VARCHAR(30))";
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
    });
});


//SERVER
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var ip   = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

console.log(port);
console.log(ip);

app.listen(port, ip, function () {
    console.log('Server running on http://%s:%s', ip, port);
});
