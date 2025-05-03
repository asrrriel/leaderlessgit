import { Database } from "sqlite-async";

var db = undefined

var pstatements = {}

export default {

    init: async function () {
        db = await Database.open("./db.sqlite");
        db.exec("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, title TEXT, author TEXT, timestamp INTEGER);");
        db.exec("CREATE TABLE IF NOT EXISTS users (name TEXT PRIMARY KEY, dispname TEXT, avatar_url TEXT)");
        db.exec("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, has_vote BOOLEAN, post_id INTEGER, author TEXT, body TEXT, timestamp INTEGER, vote_options TEXT[], vote_counts INTEGER[], reaction_counts INTEGER[])");
        db.exec("CREATE TABLE IF NOT EXISTS tokens (token TEXT PRIMARY KEY, user TEXT, timestamp INTEGER, ip TEXT);");

        pstatements["create_post"] = await db.prepare("INSERT INTO posts (id, title, author, timestamp) VALUES (?, ?, ?, ?);");
        pstatements["create_user"] = await db.prepare("INSERT INTO users (name, dispname, avatar_url) VALUES (?, ?, ?);");
        pstatements["create_message"] = await db.prepare("INSERT INTO messages (id, has_vote, post_id, author, body, timestamp, vote_options, vote_counts, reaction_counts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
        pstatements["create_token"] = await db.prepare("INSERT INTO tokens (token, user, timestamp, ip) VALUES (?, ?, ?, ?);");

        pstatements["get_post"] =  await db.prepare("SELECT * FROM posts WHERE id = ?;");
        pstatements["get_user"] =  await db.prepare("SELECT * FROM users WHERE name = ?;");
        pstatements["get_message"] =  await db.prepare("SELECT * FROM messages WHERE id = ?;");
        pstatements["get_token"] = await db.prepare ("SELECT * FROM tokens WHERE token = ?;");

        pstatements["get_latest_posts"] = await db.prepare("SELECT * FROM posts ORDER BY timestamp DESC LIMIT ? OFFSET ?;");
        pstatements["get_posts_by_author"] = await db.prepare("SELECT * FROM posts WHERE author = ? ORDER BY timestamp DESC LIMIT ? OFFSET ?;");
        pstatements["get_posts_by_title"] = await db.prepare("SELECT * FROM posts WHERE title LIKE ? ORDER BY timestamp DESC LIMIT ? OFFSET ?;");
        pstatements["get_posts_by_author_and_title"] = await db.prepare("SELECT * FROM posts WHERE author = ? AND title LIKE ? ORDER BY timestamp DESC LIMIT ? OFFSET ?;");

        pstatements["get_messages_on_post"] = await db.prepare("SELECT * FROM messages WHERE post_id = ? ORDER BY timestamp DESC LIMIT ? OFFSET ?;");

        pstatements[""] = await db.prepare("UPDATE users SET dispname = ?, avatar_url = ? WHERE name = ?;");
        pstatements[""] = await db.prepare("UPDATE posts SET title = ?, author = ?, timestamp = ? WHERE id = ?;");
        pstatements[""] = await db.prepare("UPDATE messages SET body = ?, timestamp = ?, vote_options = ?, vote_counts = ?, reaction_counts = ? WHERE id = ?;");

        pstatements[""] = await db.prepare("DELETE FROM users WHERE name = ?;");
        pstatements[""] = await db.prepare("DELETE FROM posts WHERE id = ?;");
        pstatements[""] = await db.prepare("DELETE FROM messages WHERE id = ?;");
        pstatements[""] = await db.prepare("DELETE FROM tokens WHERE token = ?;");
    },

    //function to use each prepared statement
    create_post: async function (id, type, title, author, timestamp) {
        return pstatements["create_post"].run(id, type, title, author, timestamp);
    },

    create_user: async function (name, dispname, avatar_url) {
        return pstatements["create_user"].run(name, dispname, avatar_url);
    },

    create_message: async function (id, post_id, author, body, timestamp, vote_options, vote_counts, reaction_counts) {
        return pstatements["create_message"].run(id, post_id, author, body, timestamp, vote_options, vote_counts, reaction_counts);
    },

    create_token: async function (token, user, timestamp, ip) {
        return pstatements["create_token"].run(token, user, timestamp, ip);
    },

    get_post: async function (id) {
        return pstatements["get_post"].get(id);
    },

    get_user: async function (name) {
        return pstatements["get_user"].get(name);
    },

    get_message: async function (id) {
        return pstatements["get_message"].all(id);
    },

    get_token: async function (token) {
        return pstatements["get_token"].get(token);
    },

    get_latest_posts: async function (limit, offset) {
        return pstatements["get_latest_posts"].all(limit, offset);
    },

    get_posts_by_author: async function (author, limit, offset) {
        return pstatements["get_posts_by_author"].all(author, limit, offset);
    },

    get_posts_by_title: async function (title, limit, offset) {
        return pstatements["get_posts_by_title"].all(title, limit, offset);
    },

    get_posts_by_author_and_title: async function (author, title, limit, offset) {
        return pstatements["get_posts_by_author_and_title"].all(author, title, limit, offset);
    },

    get_messages_on_post: async function (post_id, limit, offset) {
        return pstatements[12].all(post_id, limit, offset);
    },


}