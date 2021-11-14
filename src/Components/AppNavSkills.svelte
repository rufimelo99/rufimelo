<script>

	//for skills nav bar
	import { navOptions } from  './NavSkills.svelte';	// import application navigation
	let intSelected = 0;
	$:selected = navOptions[intSelected];	// keep track of the selected 

    function changeComponent(event) {
		selected = navOptions[event.srcElement.id];
		intSelected = event.srcElement.id;
	}
    
</script>

<div class="container justify-content-between"> 
            
    <div class="row">
        <nav class="navbar main-bgcolor navbar-expand-md navbar-dark">
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ml-auto">
                
                {#each navOptions as option, i}
                    <li class="nav-item">
                        <a class="nav-link light-color" on:click={changeComponent} id={i} href="#footer">{option.page}</a>
                    </li>
                {/each}
            </ul>
            </div>
        </nav> 
    </div>   
    <div class="row">
        <div >
            
            <!-- this is where our main content is placed -->
            <svelte:component this={selected.component}/>
        </div>
    </div>
</div>




<style>
    .nav-link{
        font-size: x-large;
        
    }
    .nav-link:hover{
        font-size: xx-large;
    }
    a{
        color:rgb(119, 168, 180); 
    }
    a:hover{
        color:rgb(123, 229, 255);
    }
</style>