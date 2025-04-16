<style>
    #sidebar-left {
        display: block;
        width: 200px;
        height: 100vh;
        background-color: black;
        color: white;
        border-right: 1px solid #ddd;
        margin-right: 16px;
    }
    #sidebar-left a li {
        display: block;
        list-style: none;
        width:90%;
        height:40px;
        background-color: darkgray;
        margin-top: 10px;
        border-radius: 8px;
        text-align: center;
        align-content: center;
    }
    #sidebar-left a {
        text-decoration: none;
        color: white;
    }
</style>

<nav id="sidebar-left" aria-label="Main Navigation">
    <ul>
        <a href="/"><li>Home</li></a>
        <a href="/tree"><li>Tree</li></a>
        <a href="/commits"><li>Commits</li></a>
        <a href="/branches"><li>Branches</li></a>
        <a href="/discussions"><li>Discussions</li></a>
        <a href="/votes"><li>Votes</li></a>
    </ul>
</nav>