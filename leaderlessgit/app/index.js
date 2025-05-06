import http from 'http';
import api from './api.js';
import path from 'path';
import fs from 'fs/promises';
import ForumDatabase from './engine/db_management/forumdb.js';
import e from 'electron';
import repo from './engine/repo.js';

const staticDirectory = "dist";

async function errpage(res, code, message) {
    var result = await serveFile(path.join(staticDirectory, "/error"), null);
    if (result == 404) {
        res.writeHead(404,{'Content-Type' : 'text/html'})
        res.write("Error page not found");
        res.end();
        return;
    }
    if (typeof(result) == "object") {
        if(typeof(result[0]) == "object"){
            const raw = result[0].toString();
            const processed = raw.replaceAll("\\\\errhere//",code.toString()).replaceAll("\\\\msghere//",message);
            res.writeHead(code,{'Content-Type' : result[1]})
            res.write(processed);
            res.end();
        } else if (result[0] == 500) {
            res.writeHead(500,{'Content-Type' : 'text/html'})
            res.write("Error page unable to load: " + result[1]);
            res.end();
        }
    }
}

async function serveFile(filePath, res, errcode, headers) {
    try {
        var ext = path.extname(filePath).toLowerCase();
        if(ext == "") {
            filePath = staticDirectory + "/index.html";
            ext = ".html";
        }
        const stats = await fs.stat(filePath);
        const data = await fs.readFile(filePath);
        // Determine the MIME type
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

//Backend initialization

repo.init("./test");

var db = new ForumDatabase();
db.init("./test");
await api.setDb(db);

http.createServer(async function (req, res) {
    console.log("Request to: " + req.url);
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


//Electron Garbage
let mainWindow;

function createWindow() {
  mainWindow = new e.BrowserWindow({
    width: 1200,
    height: 800,
    autoHideMenuBar: true, 
  });

  mainWindow.loadURL('http://localhost:8080');

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

e.app.whenReady().then(createWindow);

e.app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    e.app.quit();
  }
});

// MacOS shit
e.app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});