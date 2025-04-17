
module.exports = {
    async fetch(req,res) {
        //return false;
        if(!req.url.startsWith("/api")) return false;
        if(req.url.startsWith("/api/posts")){
            res.writeHead(200, {'Content-Type': 'text/json'});
            res.write(JSON.stringify([
                {id: 1,type: 1,title: "test post",author: "god@heaven.hu",timestamp: 1694017830},
                {id: 1,type: 1,title: "Trololero Trololo",author: "god@heaven.hu",timestamp: 1694017830},
            ]));
            return true;
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