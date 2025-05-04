<script>
    var post = {};
    var author = {};
    var messages = [];
    async function load(params) {
        const post_id = window.location.pathname.split('/')[3];
        const userResponse = await fetch(`/api/posts/get/${post_id}`);
        post = await userResponse.json();

        const authorResponse = await fetch(`/api/users/get/${post.author}`);
        author = await authorResponse.json();

        const messagesResponse = await fetch(`/api/messages/${post_id}_10_0`);
        messages = await messagesResponse.json();

        messages = await Promise.all(messages.map(async (message) => {
            const authorResponse = await fetch(`/api/users/get/${message.author}`);
            const author = await authorResponse.json(); 
            return {
                id: message.id,
                author: {
                    name: author.name,
                    dispname: author.dispname,
                    avatar_url: author.avatar_url,
                },
                body: message.body,
                timestamp: message.timestamp,
            }
        }));
    }
    load(); // FUCK YOU JAVASCRIPT
    
    document.title = "Forum - LeaderlessGIT";
</script>

<h1>{post.title}</h1>
<h3>by {author.dispname}</h3>
<h2>Messages:</h2>
{#each messages as message}
    <p>{message.author.dispname}: {message.body}</p>
{/each}
