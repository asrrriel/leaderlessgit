<script>
    import { onMount } from "svelte";

    let user = null;
    let error = null;

    onMount(async () => {
        try {
            const username = window.location.pathname.split('/')[3];
            const res = await fetch(`/api/users/get/${username}`);
            if (!res.ok) throw new Error("User not found");
            user = await res.json();
            document.title = `${user.dispname} @ LeaderlessGIT`;
        } catch (err) {
            error = err.message;
        }
    });
</script>

{#if error}
    <div class="alert alert-danger mt-4">{error}</div>
{:else if !user}
    <div class="d-flex justify-content-center mt-5">
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    </div>
{:else}
    <div class="container mt-5 text-center">
        <img src="{user.avatar_url}" alt="{user.dispname}" class="rounded-circle shadow mb-3" width="150" height="150">
        <h1 class="display-5">{user.dispname} <small class="text-secondary">({user.name})</small></h1>
    </div>
{/if}
