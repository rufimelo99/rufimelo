<script> 
	import { Router, Route } from "svelte-routing";
	import Tailwindcss from './Tailwindcss.svelte';
	import MainPage from './views/MainPage.svelte';
	export let name;
  	export let url = "";
    
</script>

<Tailwindcss />
<main>
	<Router url="{url}">
	<Route path="/" component="{MainPage}" />
	</Router>
</main>
