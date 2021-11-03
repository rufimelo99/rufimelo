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

<Parallax sections=5 style="background-color: #253237;" {disabled} bind:this={parallax}>
	<ParallaxLayer offset=0  rate=1 >

	<!--Stars-->	
	<ParallaxLayer offset=0 rate=0 span=10 style="background-image: { url('stars', true) }; background-size: cover;"/>	
	</ParallaxLayer>
	
	<!--Parallax Cover-->
	<ParallaxLayer offset=0  rate=1.7>
		<img src="assets/p0.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.55>
		<img src="assets/p1.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.4>
		<img src="assets/p2.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.25>
		<img src="assets/p3.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.10>
		<img src="assets/p4.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.0>
		<img src="assets/p5.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=0.9>
		<img src="assets/p6.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=0.8>
		<img src="assets/p7.png" alt="">
	</ParallaxLayer>

	<!--Floating images behing (Tecnico,UA and Basketball) + About Me Sectioon-->
	<ParallaxLayer offset=0.99  rate=-0.4>
		<img src=assets/ist.png  alt='' style="width: 15%; margin-right: 70%;margin-left: 10%;">
	</ParallaxLayer>
	<ParallaxLayer offset=1  rate=1>
		<PersonalDescription></PersonalDescription>
	</ParallaxLayer>
	<!--<ParallaxLayer offset=1.1  rate=-0.3>
		<img src=assets/basketball.gif  alt='' style="width: 15%; margin-left: 80%;">
	</ParallaxLayer>	-->
	<ParallaxLayer offset=1.5  rate=1.6>
		<img src=assets/ua.png  alt='' style="width: 25%; margin-right: 30%;margin-left: 50%;">
	</ParallaxLayer>
	<!------------------------------>

	<!--CV-->
  <ParallaxLayer offset=2 rate=1>
	<Header
		title={"Interactive CV"}
		body={"(Feel free to move things around)"}>

	</Header>
  </ParallaxLayer>
  <ParallaxLayer offset=2.2  rate=1>
	<AppCanvas
		bind:this={myAppCanvas}></AppCanvas>
  </ParallaxLayer>

	<!--Tech-->

  <ParallaxLayer offset=3 rate=1>
	<Header
		title={"Skills"}
		body={""}>
	</Header>
  </ParallaxLayer>


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
	<!--
	<a href="mailto:rufimelo99@gmail.com">
		<img 
			src=assets/gmail.svg 
			alt='' 
			style="width: 100px; height: 100px; margin-left: calc(7%+200px);" 
		tabindex=0
	></a>-->
		
	<ParallaxLayer offset=4.95 rate=0>
		<p class="ownership" >
			I do not own the art from Fire Watch or Codepen
		</p>
	</ParallaxLayer>
</Parallax>


<style>
	.ownership{
		padding-right: 2%;
		text-align: end;
		text-align: right;    
		color: rgb(119, 168, 180);
        font-family: 'opensans-regular', sans-serif;
    
	}

	:global(body) {
		padding: 0;
	}

	img{
		width: 100%;
	}

</style>