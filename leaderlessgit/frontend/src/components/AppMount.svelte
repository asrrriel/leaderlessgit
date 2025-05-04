<script>
	import SideBar from './SideBar.svelte';
	import Home from '../routes/Home.svelte';
	import Tree from '../routes/Tree.svelte';
	import Forum from '../routes/Forum.svelte';
	import Post from '../routes/Post.svelte';
	import Profile from '../routes/Profile.svelte';
	import error from '../routes/Error.svelte';

	const routes = [
		{pattern: /^\/$/, comp: Home},
		{pattern: /^\/tree$/, comp: Tree},
		{pattern: /^\/forum$/, comp: Forum},
		{pattern: /^\/forum\/post\/[^/]+$/, comp: Post},
		{pattern: /^\/forum\/profile\/[^/]+$/, comp: Profile},
	];
	
	var currentRoute = undefined;
	
	function updatePath(){
		currentRoute = routes.find(route => route.pattern.test(window.location.pathname));
		if(currentRoute){
			currentRoute = currentRoute.comp;
		}
	};
	updatePath();

	window.addEventListener('popstate', updatePath);
	window.addEventListener('pushstate', updatePath); // custom event we’ll define below

	// Monkey-patch history.pushState to emit pushstate event
	const originalPushState = history.pushState;
	history.pushState = function (...args) {
		originalPushState.apply(this, args);
		window.dispatchEvent(new Event('pushstate'));
		updatePath();
	};
</script>
<div class="row align-items-start">

	<div class="col-2">
		<SideBar />
	</div>

	<div class="col">
		{#if currentRoute}
			<svelte:component this={currentRoute} />
		{:else}
			<svelte:component this={error} code="404" message= "Not Found" />
		{/if}
	</div>
</div>