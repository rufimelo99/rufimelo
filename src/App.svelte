<script>
	import { Parallax, ParallaxLayer} from 'svelte-parallax'
	
	
	//https://svelte.dev/repl/1504d411044745a186004855521a89c7?version=3.35.0
	
	
	
	import Button from './Components/Button.svelte'
	import PersonalDescription from './Components/PersonalDescription.svelte'
	import AppCanvas from './Components/FlowProgramming/AppCanvas.svelte'
	import Canvas from './Components/FlowProgramming/Canvas.svelte'
	import Header from './Components/Header.svelte'
	import Footer from './Components/Footer.svelte'
	import ProgrammingLanguagues from './Components/ProgrammingLanguagues.svelte'
	import Projects from './Components/Projects.svelte'

	

	let parallax;
	let myAppCanvas;

    let header ="Melo";


	function scrollToAboutMe3() {
		parallax.scrollTo(3, {selector: '.top-btn', duration: 4000});
	}


</script>
<section id="nav-bar" style="z-index: 1;">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
			<li class="nav-item">
				<a class="nav-link light-color logoInNav" href="#aboutme">
					<span>About me</span>
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link light-color logoInNav" href="#programming">
					<span>Programming Languagues</span>
				</a>
			</li>
			
			<li class="nav-item">
				<a class="nav-link light-color logoInNav" href="#projects">
					<span>Projects</span>
				</a>
			</li>

			<li class="nav-item">
				<a class="nav-link light-color logoInNav" href="https://github.com/rufimelo99">
					<img src=assets/gitWhite.png  alt="Github" width="30" height="24" class="d-inline-block align-text-top">
				</a>
			</li>
			<li class="nav-item">
				<a class="nav-link light-color logoInNav" href="https://www.linkedin.com/in/rui--melo/">
					<img src=assets/linkedinWhite.png  alt="Linkedin" width="30" height="24" class="d-inline-block align-text-top">
				</a>
			</li>
			
        </ul>
      </div>
    </nav>

  </section>

  	<Parallax sections=1.2 style="background-color: black;" bind:this={parallax}>
		  
		<ParallaxLayer offset=0  rate=1.7 span=2>
			<img src="assets/p0.png" alt=""  class="header">
		</ParallaxLayer>
		<ParallaxLayer offset=0  rate=1.55 span=2 >
			<img src="assets/p1.png" alt="" class="header">
		</ParallaxLayer>
		<ParallaxLayer offset=0  rate=1.4 span=2>
			<img src="assets/p2.png" alt="" class="header">
		</ParallaxLayer>
		<ParallaxLayer offset=0  rate=1.25 span=2>
			<img src="assets/p3.png" alt="" class="header">
		</ParallaxLayer>
		<ParallaxLayer offset=0  rate=1.10 span=2>
			<img src="assets/p4.png" alt="" class="header">
		</ParallaxLayer>
		<ParallaxLayer offset=0  rate=1.0 span=2>
			<img src="assets/p5.png" alt="" class="header">
		</ParallaxLayer>
		<ParallaxLayer offset=0  rate=0.9 span=2>
			<img src="assets/p6.png" alt="" class="header">
		</ParallaxLayer>
		<ParallaxLayer offset=0  rate=0.8 span=2>
			<img src="assets/p7.png" alt="" class="header">
		</ParallaxLayer>
		
		<ParallaxLayer offset=0 rate=0 span=5 class="stars" style="background-image: url('/assets/stars.svg'); background-size: cover;">	
		</ParallaxLayer>
		
		<ParallaxLayer offset=0.55 rate=1.2 >
				<img src="assets/hellothere.png" alt="">
		</ParallaxLayer>
			
		<!--
		<ParallaxLayer offset=0.3  rate=1.8>
			<a href="https://github.com/rufimelo99">
				<img 
					src=assets/gitPurple.png 
					alt='' 
					style="width: 10%; margin-left: 65%; min-width: 80px" 
				tabindex=0
				></a>
		</ParallaxLayer>	
		<ParallaxLayer offset=0.4  rate=1.1>
			<a href="https://www.linkedin.com/in/rui--melo/">
				<img 
					src=assets/linkedin.png 
					alt='' 
					style="width: 10%; margin-left: 15%; min-width: 80px" 
				tabindex=0
				></a>
		</ParallaxLayer>
		<ParallaxLayer offset=0.9  rate=1.4>
		<a href="https://drive.google.com/file/d/131qxcViy4HeMCobGHX6Tjh9KbQZtlpYb/view?usp=sharing">
			<img 
				src=assets/cv.png 
				alt='' 
				style="width: 20%; margin-left: 60%; margin-right: 20%; min-width: 100px" 
			tabindex=0
			></a>
		</ParallaxLayer>-->
	</Parallax>

	<div class="container">	
		<div class="row">
			<div id="aboutme"  class="sections">
				<PersonalDescription></PersonalDescription>
				</div>
		</div>
		<div class="row">
			<div id="programming" class="sections">
				<ProgrammingLanguagues></ProgrammingLanguagues>
			
			</div>
			<div id="projects" class="sections">
				<Projects></Projects>
			</div>
		</div>

	</div>
	
		
	<div id="footer" style="padding-top: 4vh">
		<Footer></Footer>
	</div>



<style>
	.sections{
		padding-top: 6vh;
	}
	img{
		width: 100%;
	}
	.logoInNav:hover{
		background-color: rgba(245, 245, 245, 0.527);
	}
	.header{
        @media (max-width: 480px) {
            img{width: 960px;}
        }
	}
</style>