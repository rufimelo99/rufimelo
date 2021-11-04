<script>

    import Button from './Button.svelte'
	//for skills nav bar
	import { navOptions } from  './NavSkills.svelte';	// import application navigation
	let intSelected = 0;
	$:selected = navOptions[intSelected];	// keep track of the selected 

    function changeComponent(event) {
		selected = navOptions[event.srcElement.id];
		intSelected = event.srcElement.id;
	}
</script>
    
    <div class="grid-container">
        <div></div>
        
        <div class="grid-buttonsOption">
            
		{#each navOptions as option, i}
		<Button on:click={changeComponent} id={i} name={option.page} > </Button>

		{/each}
	
        <div >
            <h1>{selected.page}</h1>
            <!-- this is where our main content is placed -->
            <svelte:component this={selected.component}/>
        </div>

        </div>

        <div></div>
        
    </div>

<style>
    .grid-container{
            display: grid;
            grid-template-columns: 10% 80% 10% ;
            min-height: 1000px;
            align-content: center;
        }
    .grid-buttonsOption{
            display: grid;
            grid-template-columns: 50% 50% ;
            align-content: center;
        }
</style>