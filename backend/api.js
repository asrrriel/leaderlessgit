
module.exports = {
    async fetch(req,res) {
        //return false;
        if(!req.url.startsWith("/api")) return false;
        if(req.url.startsWith("/api/posts")){
            res.writeHead(200, {'Content-Type': 'text/json'});
            res.write(JSON.stringify([
                {id: 1,type: 1,title: "Never gonna give you up",author_id: 1,timestamp: 1694017830},
            ]));
            return true;
        };
        if(req.url.startsWith("/api/users/get/1")){
            res.writeHead(200, {'Content-Type': 'text/json'});
            res.write(JSON.stringify({id:1,username: "Matthias Klumpp",avatar_url: "https://secure.gravatar.com/avatar/bb7b83cab8ae1b29c0bc2d3541bcf104c353b03cf52c40a791045ccf2a042ab8?s=384&d=identicon"}));
            return true;
        };
        res.writeHead(200, {'Content-Type': 'text/json'});
        res.write(JSON.stringify({hello: "world"}));
        return true;
    },
}