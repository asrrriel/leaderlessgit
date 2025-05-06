

var db = undefined;

async function get_posts(req,res) {
    if(req.url.startsWith("/api/posts/search/author/")) {
        var result = await db.get_posts_by_author(decodeURIComponent(decodeURI(req.url.split("/")[5])), 10, 0);
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(JSON.stringify(result));
        return true;
    }
    if(req.url.startsWith("/api/posts/search/title/")) {
        var result = await db.get_posts_by_title(decodeURIComponent(decodeURI(req.url.split("/")[5])), 10, 0);
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(JSON.stringify(result));
        return true;
    }
    if(req.url.startsWith("/api/posts/get/")) {
        var result = await db.get_post(Number(decodeURIComponent(decodeURI(req.url.split("/")[4])), decodeURIComponent(decodeURI(req.url.split("/")[6]))));
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(JSON.stringify(result));
        return true;
    }

    var result = await db.get_latest_posts(10, 0);
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(JSON.stringify(result));
    return true;
}

async function get_messages(req,res) {
    var ids = decodeURIComponent(decodeURI(req.url.split("/")[3])).split("_");
    var result = await db.get_messages_on_post(Number(ids[0]), Number(ids[1]), Number(ids[2]));
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(JSON.stringify(result));
    return true;
}

async function get_user(req,res) {
    var result = await db.get_user(decodeURIComponent(decodeURI(req.url.split("/")[4])));
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(JSON.stringify(result));
    return true;
}

export default {
    setDb(database) {
        db = database;
    },
    async fetch(req,res) {
        if(!req.url.startsWith("/api")) return false;
        if(req.url.startsWith("/api/posts")){
            return get_posts(req,res);
        };
        if(req.url.startsWith("/api/messages/")){
            return get_messages(req,res);
        };
        if(req.url.startsWith("/api/users/get/")){
            return get_user(req,res);
        };
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(JSON.stringify({hello: "world"}));
        return true;
    },
}