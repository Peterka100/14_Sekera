const express = require('express');
const path = require ('path');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const sessions = require('express-session'); // pro umožnění práce se session - není potřeba se znovu logovat

var app = express();
var session;

app.use(express.static(__dirname ));
app.use(bodyParser.urlencoded({extended:true})); // starši zapis byval app.use(bodyParser.json()); ale je to depricated v blizkej dobe


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

app.get('/admin', function (req, res) {
    if (session.uniqueID) {
        console.log(session.uniqueID);
        console.log(session.passwordID);
        res.sendFile('Admin.html', {root: path.join(__dirname, './html')});
    } else
        res.redirect('/redirects');
});

app.get('/logout', function(req,res){
    req.session.destroy();
    res.sendFile('/logout.html', {root: path.join(__dirname, './html')});
});

app.post('/login', function(req,res){
    session = req.session;
    if (session.uniqueID) {
        res.redirect('/redirects');
    }
    if (req.body.Username == 'peter' && req.body.Password == 'peter') {
        session.uniqueID = req.body.Username;
        session.passwordID = req.body.Password;
    }
    res.redirect('/redirects');
});

app.get('/redirects', function(req,res){
    session = req.session;
    if(session.uniqueID){
        res.redirect('/admin')
    } else {
        res.end ('Neplatny login <a href="/logout">Kill session </a>');
    }
});





/*
//DB MYSQL

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
*/

//SERVER
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var ip   = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0'

console.log(port);
console.log(ip);

app.listen(port, ip, function () {
    console.log('Server running on http://%s:%s', ip, port);
});
