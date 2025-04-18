<script>
    import Post from './Post.svelte';

    let posts = [];
    let search = '';

    async function fetchLatestPosts() {
        try {
            let url = '/api/posts';
            if(search !== '') {
                const match = search.match(/^by:(title|author)\s+(.*)$/i);
                const [, searchType, searchTerm] = match;
                console.log(searchType, searchTerm);
                url = `/api/posts/search/${searchType}/${encodeURIComponent(searchTerm)}`;
            }
            const postsResponse = await fetch(url);
            const postsData = await postsResponse.json();
            const postsWithAuthors = await Promise.all(
                postsData.map(async (post) => {
                    const authorResponse = await fetch(`/api/users/get/${post.author}`);
                    const author = await authorResponse.json(); 
                    return {
                        id: post.id,
                        type: post.type,
                        title: post.title,
                        author: {
                            name: author.name,
                            dispname: author.dispname,
                            avatar_url: author.avatar_url,
                        },
                        timestamp: post.timestamp,
                    };
                })
            );
            posts = postsWithAuthors;
        } catch (error) {
            console.error('Error fetching posts or author data:', error);
            posts = [];
        }
    }

    fetchLatestPosts();
</script>

<style>
    #post-container {
        display: block;
        width: 100%;
        height: 100%;
        padding: 16px;
        margin-right: 16px;
    }
</style>


<div id="post-container">
    <h1>Latest Posts:</h1>
    <input type="search" name="search" id="search" bind:value={search} on:change={() => fetchLatestPosts()}>
    {#each posts as post}
        <Post title={post.title} author={post.author.dispname} author_realname={post.author.name} author_avatar_url={post.author.avatar_url} timestamp={post.timestamp} />
    {/each}
</div>
