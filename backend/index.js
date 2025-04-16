const http = require('http');
const api = require('./api');
const path = require('path');
const fs = require('fs').promises;

const staticDirectory = path.join(__dirname, '../frontend/dist');

async function errpage(res, code, message) {
    var result = await serveFile(path.join(staticDirectory, "/error"), null);
    if (result == 404) {
        res.writeHead(404,{'Conetent-Type' : 'text/html'})
        res.write("Error page not found");
        res.end();
        return;
    }
    if (typeof(result) == "object") {
        if(typeof(result[0]) == "object"){
            const raw = result[0].toString();
            const processed = raw.replaceAll("\\\\errhere//",code.toString()).replaceAll("\\\\msghere//",message);
            res.writeHead(code,{'Conetent-Type' : result[1]})
            res.write(processed);
            res.end();
        } else if (result[0] == 500) {
            res.writeHead(500,{'Conetent-Type' : 'text/html'})
            res.write("Error page unable to load: " + result[1]);
            res.end();
        }
    }
}

async function serveFile(filePath, res, errcode, headers) {
    try {
        const stats = await fs.stat(filePath);
        if (stats.isDirectory()){
            return serveFile(path.join(filePath, 'index.html'), res, errcode, headers);
        }
        const data = await fs.readFile(filePath);
        // Determine the MIME type
        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.json': 'application/json',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml',
            '.txt': 'text/plain',
        };
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        if (res == null) {
            return [data,contentType];
        }
        var h = headers || {};
        h['Content-Type'] = contentType;
        res.writeHead(errcode, h);
        res.write(data);
        res.end();
    } catch (err) {
        if(err.code == 'ENOENT'){
            if(res == null) return 404;
            errpage(res, 404, "Not Found");
        } else {
            if(res == null) return [500,err.message];
            errpage(res, 500, err.message);
        }
        return false;
    }
}

http.createServer(async function (req, res) {
    console.log("Request from " + req.socket.remoteAddress + ": " + req.url);
    var result = await api.fetch(req, res);
    if (result) {
        res.end();
        return;
    }

    const filePath = path.join(staticDirectory, req.url);
    serveFile(filePath, res, 200, null);

}).listen(8080, () => {
    console.log("Server listening on port 8080");
});