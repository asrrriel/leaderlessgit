<script>
    import { onMount } from "svelte";
  
    let post = {};
    let author = {};
    let messages = [];
  
    onMount(async () => {
        const post_id = window.location.pathname.split('/')[3];
        const postResponse = await fetch(`/api/posts/get/${post_id}`);
        post = await postResponse.json();
        post.timestamp = new Date(post.timestamp * 1000).toLocaleString();

        const authorResponse = await fetch(`/api/users/get/${post.author}`);
        author = await authorResponse.json();

        const messagesResponse = await fetch(`/api/messages/${post_id}_10_0`);
        let rawMessages = await messagesResponse.json();

        messages = await Promise.all(rawMessages.map(async (message) => {
            const messageAuthorResponse = await fetch(`/api/users/get/${message.author}`);
            const messageAuthor = await messageAuthorResponse.json();
            console.log(message);
            return {
                id: message.id,
                author: {
                    name: messageAuthor.name,
                    dispname: messageAuthor.dispname,
                    avatar_url: messageAuthor.avatar_url,
                },
                body: message.body,
                timestamp: new Date(message.timestamp * 1000).toLocaleString(),
            };
        }));

        document.title = "Forum - LeaderlessGIT";
    });

    function goto(url) {
        window.location.href = url
    }

</script>
  
<div class="container mt-5">
    <div class="card mb-4 bg-dark text-white">
        <div class="card-body">
            <h1>{post.title}</h1>
            <h5 class="text-secondary">by {author.dispname}</h5>
            <h5 class="text-secondary">Posted on {post.timestamp}</h5>
            <hr />
        </div>
    </div>
  
    <div>
        <h3>Messages</h3>
        {#each messages as message}
            <div class="card mb-3">
                <div class="card-body d-flex bg-dark text-white">
                    <img
                      src="{message.author.avatar_url}"
                      alt="avatar"
                      class="rounded-circle me-3"
                      style="width: 48px; height: 48px; object-fit: cover;"
                    />
                    <div>
                        <h6 class="card-title mb-1">
                            <span style="cursor: pointer;" on:click={() => goto('/forum/profile/' + message.author.name)}>
                                {message.author.dispname}
                            </span>
                            
                            <small class="text-secondary ms-2">
                                {message.timestamp}
                            </small>
                        </h6>
                      <p class="card-text">{message.body}</p>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
  