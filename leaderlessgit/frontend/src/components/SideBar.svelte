<style>
    a {
        color: white;
        text-decoration: none;
    }
</style>
<script>
    function goto(url) {
        window.location.href = url
    }
</script>
<div class="d-grid gap-2 mx-auto">
        {#each [
            { href: "/tree", label: "Tree" },
            { href: "/commits", label: "Commits" },
            { href: "/forum", label: "Forum" },
        ] as link}
                <button type="button" class="btn w-100 {window.location.pathname.startsWith(link.href) ? 'btn-primary' : 'btn-dark'}" on:click={() => goto(link.href)}>
                    {link.label}
                </button>

        {/each}
</div>