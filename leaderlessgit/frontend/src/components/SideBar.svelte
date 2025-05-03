<style>
    a {
        color: white;
        text-decoration: none;
    }
</style>
<div class="d-grid gap-2 mx-auto">
        {#each [
            { href: "/", label: "Home" },
            { href: "/tree", label: "Tree" },
            { href: "/commits", label: "Commits" },
            { href: "/branches", label: "Branches" },
            { href: "/discussions", label: "Discussions" },
            { href: "/votes", label: "Votes" }
        ] as link}
            <a href="{link.href}">
                <button type="button" class="btn w-100 {window.location.pathname === link.href ? 'btn-primary' : 'btn-dark'}">
                    {link.label}
                </button>
            </a>

        {/each}
</div>