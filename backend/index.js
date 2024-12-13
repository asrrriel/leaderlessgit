const http = require('http');
const api = require('./api');
const path = require('path');
const fs = require('fs');

const staticDirectory = path.join(__dirname, 'public');

function do404(res) {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    fs.readFile(staticDirectory + "404.html", (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end("500 Internal Server Error\n");
            return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
    });
}

http.createServer(async function (req, res) {

    const filePath = path.join(staticDirectory, req.url === '/' ? 'index.html' : req.url);
    fs.stat(filePath, async (err, stats) => {
        if (err || !stats.isFile()) {
            var result = await api.fetch(req, res);
            if (result) {
                res.end();
                return;
            }

            do404(res);
        }

        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end("500 Internal Server Error\n");
                return;
            }

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

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);

        });
    });
}).listen(8080, () => {
    console.log("Server listening on port 8080");
});