const express = require('express');
const path = require ('path');

var app = express();

app.use(express.static(__dirname ));


app.get('/', function (req, res) {
    res.sendFile('Card.html', {root: path.join(__dirname, './public/html')});
});

app.get('/test', function (req, res) {
    res.sendFile('test.html', {root: path.join(__dirname, './public/html')});
});


var port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var ip   = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

console.log(port);
console.log(ip);

app.listen(port, ip, function () {
    console.log('Server running on http://%s:%s', ip, port);
});
