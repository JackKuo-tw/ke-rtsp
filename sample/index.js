var http = require('http');
var fs = require('fs');
var path = require('path');
var rtsp = require('../dist/Index');
var url = require('url');

var server = http.createServer(function (req, res) {
    // login required
    if (req.method == 'GET' && req.url == '/') {
        res.writeHead(200,{'Content-Type':'text/html'});
        res.end(fs.readFileSync(__dirname + '/login.html', {
            encoding: 'utf-8'
        }));
    } else if (req.method == 'GET' && req.url.startsWith('/CCTV')) {
        var params = url.parse(req.url, true).query;
        res.writeHead(200, {
            'Content-Type': 'text/html'
        });
        var passwd = fs.readFileSync(".password", "utf-8").trim();
        if (params.password===passwd) {
            res.end(fs.readFileSync(__dirname + '/home.html', {
                encoding: 'utf-8'
            }));
        } else {
            res.end("<H1> Sorry, incorrect password</H1>");
        }
    } else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end("not found: " + req.url);
    }
});
new rtsp.StreamingMediaServer(server);
server.listen(8080);
