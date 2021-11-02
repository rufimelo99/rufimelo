<script>
	import { Parallax, ParallaxLayer} from 'svelte-parallax'
	let disabled = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	
	let parallax;
	
	import Button from './Components/Button.svelte'
	import PersonalDescription from './Components/PersonalDescription.svelte'
	import TemporaryCanvas from './Components/TemporaryCanvas.svelte'
	
	//https://svelte.dev/repl/1504d411044745a186004855521a89c7?version=3.35.0
	const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
</script>

<Parallax sections=4 style="background-color: #253237;" {disabled} bind:this={parallax}>
	<ParallaxLayer offset=0  rate=1 >

	<!--Stars-->	
	<ParallaxLayer offset=0 rate=0 span=6 style="background-image: { url('stars', true) }; background-size: cover;"/>	
	</ParallaxLayer>
	
	<!--Parallax Cover-->
	<ParallaxLayer offset=0  rate=1.5>
		<img src="assets/p0.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.4>
		<img src="assets/p1.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.3>
		<img src="assets/p2.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.2>
		<img src="assets/p3.png" alt="">
	</ParallaxLayer>
	<ParallaxLayer offset=0  rate=1.1>
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

	<!--Flating images behing-->
	<ParallaxLayer offset=0.99  rate=2>
		<img src=favicon.png  alt='' style="width: 15%; margin-right: 60%;margin-left: 20%;">
	</ParallaxLayer>

	<ParallaxLayer offset=1.3  rate=-0.3>
		<img src=assets/basketball.gif  alt='' style="width: 15%; margin-left: 80%;">
	</ParallaxLayer>
	<ParallaxLayer offset=1.1  rate=1.5>
		<img src=favicon.png  alt='' style="width: 15%; margin-right: 60%;margin-left: 20%;">
	</ParallaxLayer>
	<!------------------------------>

  <ParallaxLayer offset=1  rate=1>
	  <PersonalDescription></PersonalDescription>
  </ParallaxLayer>

  <ParallaxLayer offset=2  rate=1>
	  <TemporaryCanvas>

	  </TemporaryCanvas>
  </ParallaxLayer>

	<ParallaxLayer offset=3 rate=-0 style="display: flex; align-items: center; justify-content: center;">
		<a href="https://drive.google.com/file/d/131qxcViy4HeMCobGHX6Tjh9KbQZtlpYb/view?usp=sharing">
		<img 
			src=assets/cv.png 
			alt='' 
			class="clients-main" 
			style="width: 100%;" 
		tabindex=0
		></a>
	</ParallaxLayer>
	
	<ParallaxLayer offset=3  rate=0>
		<a href="https://github.com/rufimelo99">
			<img 
				src=assets/git.png 
				alt='' 
				style="width: 100px; height: 100px; margin-left: 5%;" 
			tabindex=0
			></a>
		<a href="https://www.linkedin.com/in/rui--melo/">
			<img 
				src=assets/linkedin.png 
				alt='' 
				style="width: 100px; height: 100px; margin-left: calc(6%+100px);" 
			tabindex=0
			></a>
		<a href="mailto:rufimelo99@gmail.com">
			<img 
				src=assets/gmail.svg 
				alt='' 
				style="width: 100px; height: 100px; margin-left: calc(7%+200px);" 
			tabindex=0
			></a>
		
	</ParallaxLayer>
	<ParallaxLayer offset=3.95 rate=0>
		<p class="ownership" >
			I do not own the art from Fire Watch or Codepen
		</p>
	</ParallaxLayer>
</Parallax>


<style>
	.ownership{
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