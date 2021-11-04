<script>
	import { Parallax, ParallaxLayer} from 'svelte-parallax'
	
	let disabled = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	
	let parallax;
	//https://svelte.dev/repl/1504d411044745a186004855521a89c7?version=3.35.0
	const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
	

	
	import Button from './Components/Button.svelte'
	import PersonalDescription from './Components/PersonalDescription.svelte'
	import AppCanvas from './Components/AppCanvas.svelte'
	import Canvas from './Components/Canvas.svelte'
	import Header from './Components/Header.svelte'
	

	let myAppCanvas;
	
</script>

<Parallax sections=2 {disabled} bind:this={parallax}>
	<!--Stars-->	
	<ParallaxLayer offset=0  rate=1 >

	
	<ParallaxLayer offset=0 rate=0 span=4 style="background-image: { url('stars', true) }; background-size: cover;"/>	
	</ParallaxLayer>
	
	<!--Parallax Cover-->
	<ParallaxLayer offset=0  rate=1.7 span=1.5>
		<img src="assets/p0.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.55 span=1.5>
		<img src="assets/p1.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.4 span=1.5>
		<img src="assets/p2.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.25 span=1.5>
		<img src="assets/p3.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.10 span=1.5>
		<img src="assets/p4.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.0 span=1.5>
		<img src="assets/p5.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=0.9 span=1.5>
		<img src="assets/p6.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=0.8 span=1.5>
		<img src="assets/p7.png" alt="">
	</ParallaxLayer>


	<ParallaxLayer offset=0.99 rate=1.2>
		<img src="assets/hellothere.png" alt="">
	</ParallaxLayer>


	<!--Floating images behing (Tecnico,UA and Basketball) + About Me Sectioon-->
	<ParallaxLayer offset=1  rate=1>
		<PersonalDescription></PersonalDescription>
	</ParallaxLayer>
	<ParallaxLayer offset=1.5  rate=1.7>
		<img src=assets/ist.png  alt='' style="width: 15%; margin-right: 70%;margin-left: 10%;">
	</ParallaxLayer>
	<ParallaxLayer offset=1.6  rate=1.6>
		<img src=assets/ua.png  alt='' style="width: 25%; margin-right: 30%;margin-left: 50%;">
	</ParallaxLayer>
	<!------------------------------>

</Parallax>

	<!--CV-->
	<Header
		title={"Interactive CV"}
		body={"(Feel free to move things around)"}>

	</Header>
	<AppCanvas
	
		class="Canvas"
		bind:this={myAppCanvas}></AppCanvas>

  	<Header
		title={"Skills"}
		body={""}>
	</Header>

<!--
	<ParallaxLayer offset=4  rate=1.8>
		<a href="https://github.com/rufimelo99">
			<img 
				src=assets/git.png 
				alt='' 
				style="width: 10%; margin-left: 85%;" 
			tabindex=0
			></a>
	</ParallaxLayer>	
	<ParallaxLayer offset=4.2  rate=1.1>
		<a href="https://www.linkedin.com/in/rui--melo/">
			<img 
				src=assets/linkedin.png 
				alt='' 
				style="width: 10%; margin-left: 15%;" 
			tabindex=0
			></a>
	</ParallaxLayer>
  <ParallaxLayer offset=4.4  rate=1.8>
	<a href="https://github.com/rufimelo99">
		<img 
			src=assets/cv.png 
			alt='' 
			style="width: 40%; margin-left: 30%; margin-right: 40%;" 
		tabindex=0
		></a>
	</ParallaxLayer>

		
	<ParallaxLayer offset=4.95 rate=0>
		<p class="ownership" >
			I do not own the art from Fire Watch or Codepen
		</p>
	</ParallaxLayer>
-->


<style>
	.ownership{
		padding-right: 2%;
		text-align: end;
		text-align: right;    
		color: rgb(119, 168, 180);
        font-family: sans-serif;
    
	}
	.Canvas{
		width:50%;
	}
	:global(body) {
		padding: 0;
    	background-color: #000000;
	}

	img{
		width: 100%;
	}

</style>