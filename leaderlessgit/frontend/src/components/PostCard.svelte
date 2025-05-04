<script>
    export let id;
    export let title;
    export let author;
    export let author_realname;
    export let timestamp;
    export let author_avatar_url;
    function goto(url) {
        window.location.href = url
    }

</script>

<article class="card mb-4 p-3 bg-secondary text-white d-flex flex-row align-items-start">
    <img class="rounded-circle me-3" src="{author_avatar_url}" alt="{author}" width="48" height="48">
    <div>
        <h1 class="h4 mb-1 text-light" style="cursor: pointer;" on:click={() => goto('/forum/post/' + id.toString())}>
            {title}
        </h1>
        <p class="mb-1">
            <span style="cursor: pointer;" on:click={() => goto('/forum/profile/' + author_realname)}>
                by {author}
                <i class="text-muted small">({author_realname})</i>
            </span>
        </p>
        <p class="text-muted small mb-0">{new Date(timestamp * 1000).toLocaleString()}</p>
    </div>
</article>
