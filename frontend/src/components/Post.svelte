<script>
  export let title;
  export let author;
  export let timestamp;
  export let author_avatar_url;
</script>

<article class="post">
  <img class="avatar" src="{author_avatar_url}" alt="{author}" />
  <div class="side-thing">
    <h1 class="post-title">{title}</h1>
    <p class="post-author">by {author}</p>
    <p class="post-timestamp">{new Date(timestamp * 1000).toLocaleString()}</p>
  </div>
</article>

<style>
  .post {
    border: 1px solid #ddd;
    padding: 16px;
    margin: 16px 0;
    border-radius: 8px;
    background-color: #f9f9f9;
    display: flex;
  }

  .avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    margin-right: 16px;
  }

  .side-thing {
    display: block;
  }

  .post-title {
    margin: 0;
    font-size: 24px;
    color: #333;
  }

  .post-author {
    margin: 8px 0 0;
    font-size: 16px;
    color: #666;
  }

  .post-timestamp {
    margin-top: 4px;
    font-size: 12px;
    color: #999;
  }
</style>
