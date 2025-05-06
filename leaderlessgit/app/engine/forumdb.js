import { Database } from "sqlite-async";
import p from "path"


class ForumDatabase {
    db = undefined
    pstatements = {}
    async init(path) {
        this.db = await Database.open(p.join(path, "db.sqlite"));
        this.db.exec("CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY, title TEXT, author TEXT, timestamp INTEGER);");
        this.db.exec("CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY, has_vote BOOLEAN, post_id INTEGER, author TEXT, body TEXT, timestamp INTEGER, vote_options TEXT[], vote_counts INTEGER[], reaction_counts INTEGER[])");
        this.db.exec("CREATE TABLE IF NOT EXISTS forumusers (name TEXT, dispname TEXT, avatar_url TEXT, pubkey TEXT);");
    
        this.pstatements["create_post"] = await this.db.prepare("INSERT INTO posts (id, title, author, timestamp) VALUES (?, ?, ?, ?);");
        this.pstatements["create_message"] = await this.db.prepare("INSERT INTO messages (id, has_vote, post_id, author, body, timestamp, vote_options, vote_counts, reaction_counts) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);");
    
        this.pstatements["get_post"] =  await this.db.prepare("SELECT * FROM posts WHERE id = ?;");
        this.pstatements["get_message"] =  await this.db.prepare("SELECT * FROM messages WHERE id = ?;");
    
        this.pstatements["get_latest_posts"] = await this.db.prepare("SELECT * FROM posts ORDER BY timestamp DESC LIMIT ? OFFSET ?;");
        this.pstatements["get_posts_by_author"] = await this.db.prepare("SELECT * FROM posts WHERE author = ? ORDER BY timestamp DESC LIMIT ? OFFSET ?;");
        this.pstatements["get_posts_by_title"] = await this.db.prepare("SELECT * FROM posts WHERE title LIKE ? ORDER BY timestamp DESC LIMIT ? OFFSET ?;");
        this.pstatements["get_posts_by_author_and_title"] = await this.db.prepare("SELECT * FROM posts WHERE author = ? AND title LIKE ? ORDER BY timestamp DESC LIMIT ? OFFSET ?;");
    
        this.pstatements["get_messages_on_post"] = await this.db.prepare("SELECT * FROM messages WHERE post_id = ? ORDER BY timestamp DESC LIMIT ? OFFSET ?;");
    
        this.pstatements["update_post"] = await this.db.prepare("UPDATE posts SET title = ?, author = ?, timestamp = ? WHERE id = ?;");
        this.pstatements["update_message"] = await this.db.prepare("UPDATE messages SET body = ?, timestamp = ?, vote_options = ?, vote_counts = ?, reaction_counts = ? WHERE id = ?;");
    
        this.pstatements["delete_post"] = await this.db.prepare("DELETE FROM posts WHERE id = ?;");
        this.pstatements["delete_message"] = await this.db.prepare("DELETE FROM messages WHERE id = ?;");
    
        this.pstatements["create_user"] = await this.db.prepare("INSERT INTO forumusers (name, dispname, avatar_url) VALUES (?, ?, ?);");
        this.pstatements["get_user"] = await this.db.prepare("SELECT * FROM forumusers WHERE name = ?;");
        this.pstatements["update_user"] = await this.db.prepare("UPDATE forumusers SET dispname = ?, avatar_url = ? WHERE name = ?;");
        this.pstatements["delete_user"] = await this.db.prepare("DELETE FROM forumusers WHERE name = ?;");
    }
    create_post(id, type, title, author, timestamp) {
        return this.pstatements["create_post"].run(id, type, title, author, timestamp);
    }

    create_user(name, dispname, avatar_url) {
        return this.pstatements["create_user"].run(name, dispname, avatar_url);
    }

    create_message(id, post_id, author, body, timestamp, vote_options, vote_counts, reaction_counts) {
        return this.pstatements["create_message"].run(id, post_id, author, body, timestamp, vote_options, vote_counts, reaction_counts);
    }
    get_post(id) {
        return this.pstatements["get_post"].get(id);
    }

    get_user(name) {
        return this.pstatements["get_user"].get(name);
    }

    get_message(id) {
        return this.pstatements["get_message"].all(id);
    }

    get_latest_posts(limit, offset) {
        return this.pstatements["get_latest_posts"].all(limit, offset);
    }

    get_posts_by_author(author, limit, offset) {
        return this.pstatements["get_posts_by_author"].all(author, limit, offset);
    }

    get_posts_by_title(title, limit, offset) {
        return this.pstatements["get_posts_by_title"].all(title, limit, offset);
    }

    get_posts_by_author_and_title(author, title, limit, offset) {
        return this.pstatements["get_posts_by_author_and_title"].all(author, title, limit, offset);
    }

    get_messages_on_post(post_id, limit, offset) {
        return this.pstatements["get_messages_on_post"].all(post_id, limit, offset);
    }

    update_post(id, title, author, timestamp) {
        return this.pstatements["update_post"].run(id, title, author, timestamp);
    }

    update_message(id, body, timestamp, vote_options, vote_counts, reaction_counts) {
        return this.pstatements["update_message"].run(id, body, timestamp, vote_options, vote_counts, reaction_counts);
    }

    update_user(name, dispname, avatar_url) {
        return this.pstatements["update_user"].run(name, dispname, avatar_url);
    }

    delete_post(id) {
        return this.pstatements["delete_post"].run(id);
    }

    delete_message(id) {
        return this.pstatements["delete_message"].run(id);
    }

    delete_user(name) {
        return this.pstatements["delete_user"].run(name);
    }
}

export default ForumDatabase;