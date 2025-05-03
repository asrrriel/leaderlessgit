<script>
	import SideBar from './SideBar.svelte';
	import Home from '../routes/Home.svelte';
	import Tree from '../routes/Tree.svelte';
	import error from '../routes/Error.svelte';


	const routes = {
		'/': Home,
		'/tree': Tree,
	};
</script>
<div class="row align-items-start">

	<div class="col-2">
		<SideBar />
	</div>

	<div class="col">
		{#if routes[window.location.pathname] == undefined}
			<svelte:component this={error} code="404" message= "Not Found" />
		{:else}
			<svelte:component this={routes[window.location.pathname]} />
		{/if}
	</div>
</div>