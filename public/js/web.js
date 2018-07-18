var http = require("http");

function process_request(req, res) {
    var body = 'Thanks for calling! Peter\n';
    var content_length = body.length;
    res.writeHead(200, {
        'Content-Length': content_length,
        'Content-Type': 'text/plain'
    });
    res.end(body);
}

var s = http.createServer(process_request);
s.listen(8987);


//var = getUserSync = require('.getUserSync');

/*
function showme() {
    var user1 = getUserSync('123');
    user1.innerHTML = 'user1 je' + user1 ;
}
*/