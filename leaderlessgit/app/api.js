import db from "./db.js";

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

    var result = await db.get_latest_posts(10, 0);
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(JSON.stringify(result));
    return true;
}

async function get_messages(req,res) {
    var result = await db.get_messages_on_post(1, 10, 0);
    res.writeHead(200, {'Content-Type': 'text/json'});
    res.write(JSON.stringify(result));
    return true;
}

export default {
    async fetch(req,res) {
        //return false;
        if(!req.url.startsWith("/api")) return false;
        if(req.url.startsWith("/api/posts")){
            return get_posts(req,res);
        };
        if(req.url.startsWith("/api/messages/")){
            return get_messages(req,res);
        };
        if(req.url.startsWith("/api/users/get/god@heaven.hu")){
            res.writeHead(200, {'Content-Type': 'text/json'});
            res.write(JSON.stringify({name:"god@heaven.hu",dispname: "Asrrriel",avatar_url: "https://cdn.discordapp.com/avatars/936986830543413310/20fdb75c25b7a55790ade61275fa8328.webp?size=1024&width=461&height=461"}));
            return true;
        };
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(JSON.stringify({hello: "world"}));
        return true;
    },
}