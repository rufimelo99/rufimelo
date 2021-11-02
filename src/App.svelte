<script>
	import { Parallax, ParallaxLayer} from 'svelte-parallax'
	let disabled = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	
	let parallax;
	
	import Button from './Components/Button.svelte'
	
	const url = (name, wrap = false) => `${wrap ? 'url(' : ''}https://awv3node-homepage.surge.sh/build/assets/${name}.svg${wrap ? ')' : ''}`
</script>

<Parallax sections=3 style="background-color: #253237;" {disabled} bind:this={parallax}>
	<ParallaxLayer offset=0  rate=1 >
	<ParallaxLayer offset=0 rate=0 span=6 style="background-image: { url('stars', true) }; background-size: cover;"/>	
	</ParallaxLayer>
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
	
	<ParallaxLayer offset=1.3  rate=-0.3>
		<img src={url('satellite4')} alt='' style="width: 15%; margin-left: 70%;">
	</ParallaxLayer>
	<ParallaxLayer offset=2 rate=-0 style="display: flex; align-items: center; justify-content: center;">
	  <a  href="https://drive.google.com/file/d/131qxcViy4HeMCobGHX6Tjh9KbQZtlpYb/view?usp=sharing">
		<img 
		  src=assets/cv.png 
		  alt='' 
		  class="clients-main" 
		  style="width: 100%;" 
		tabindex=0
	  ></a>
  </ParallaxLayer>
	<ParallaxLayer offset=1  rate=1>
		<Button name={"hello"}></Button>
	</ParallaxLayer>
</Parallax>


<style>
	:global(body) {
		padding: 0;
	}

	img{
		width: 100%;
	}

</style>