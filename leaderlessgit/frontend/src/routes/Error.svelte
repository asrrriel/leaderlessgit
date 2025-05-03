<script>
    export let code;
    export let message;

    document.title = 'Error ' + code + ' - LeaderlessGIT';
</script>

<h1>{code}</h1>
<p>{message}</p>