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
    <nav class="navbar main-bgcolor navbar-expand-md navbar-dark fixed-top">
      
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation">
        <span class="navbar-toggler-icon" />
      </button>
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
			<li class="nav-item">
				<a class="nav-link light-color logoInNav" href="https://drive.google.com/file/d/131qxcViy4HeMCobGHX6Tjh9KbQZtlpYb/view?usp=sharing">
					<img src=assets/cv.png  alt="Resumé" width="30" height="24" class="d-inline-block align-text-top">
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
		
		<ParallaxLayer offset=0.90 rate=1.2 >
				<img src="assets/hellothere.png" alt="">
		</ParallaxLayer>
			
		<!--
		<ParallaxLayer offset=1  rate=1>
			<div id="aboutme">
			<PersonalDescription></PersonalDescription>
			</div>
		</ParallaxLayer>
		<ParallaxLayer offset=1.45  rate=1.8>
			<img src=assets/ist.png  alt='' style="width: 15%; margin-right: 10%;margin-left: 70%;">
		</ParallaxLayer>
		<ParallaxLayer offset=1.7  rate=1.6>
			<img src=assets/ua.png  alt='' style="width: 25%; margin-right: 10%;margin-left: 70%;">
		</ParallaxLayer>
		


		<ParallaxLayer offset=2.1  rate=1.8>
			<a href="https://github.com/rufimelo99">
				<img 
					src=assets/gitPurple.png 
					alt='' 
					style="width: 10%; margin-left: 85%;" 
				tabindex=0
				></a>
		</ParallaxLayer>	
		<ParallaxLayer offset=2.25  rate=1.1>
			<a href="https://www.linkedin.com/in/rui--melo/">
				<img 
					src=assets/linkedin.png 
					alt='' 
					style="width: 10%; margin-left: 15%;" 
				tabindex=0
				></a>
		</ParallaxLayer>
		<ParallaxLayer offset=2.6  rate=1>
		<a href="https://drive.google.com/file/d/131qxcViy4HeMCobGHX6Tjh9KbQZtlpYb/view?usp=sharing">
			<img 
				src=assets/cv.png 
				alt='' 
				style="width: 40%; margin-left: 30%; margin-right: 40%; max-width: 450px" 
			tabindex=0
			></a>
		</ParallaxLayer>
		<ParallaxLayer offset=3  rate=1 span=4>
			<ProgrammingLanguagues></ProgrammingLanguagues>
			<Projects></Projects>
		</ParallaxLayer>-->
	</Parallax>

	<div class="container">	
		<div class="row">
			<div id="aboutme">
				<PersonalDescription></PersonalDescription>
				</div>
		</div>
		<div class="row">
			<div id="programming">
				<ProgrammingLanguagues></ProgrammingLanguagues>
			
			</div>
			<div id="projects">
				
				<Projects></Projects>
			
			</div>
		</div>

	</div>

	<div id="footer">
		<Footer></Footer>
	</div>



<style>
	
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