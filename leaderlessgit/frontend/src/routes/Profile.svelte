<script>
    var user = {};
    async function load(params) {
        const username = window.location.pathname.split('/')[3];
        const userResponse = await fetch(`/api/users/get/${username}`);
        user = await userResponse.json();
    }
    load(); // FUCK YOU JAVASCRIPT

    console.log(user);

    document.title = user.dispname + " @ LeaderlessGIT";
</script>

<img src={user.avatar_url} alt={user.dispname}>
<h1>{user.dispname}(a.k.a {user.name})</h1>
