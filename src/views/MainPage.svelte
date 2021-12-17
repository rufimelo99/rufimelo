<script>
    import { Link } from "svelte-routing";
    // core components
    //import IndexNavbar from "components/Navbars/IndexNavbar.svelte";
    //import Footer from "components/Footers/Footer.svelte";

    //export let location;
    import {Parallax, ParallaxLayer} from 'svelte-parallax'
    
    import ParallaxBackground from "../components/Parallax/ParallaxBackground.svelte";
    import IndexNavbar from "../components/Navbars/IndexNavbar.svelte";
    import Footer from "../components/Footers/Footer.svelte";
    import Ola from "../components/ola.svelte";
</script> 

<IndexNavbar />
<ParallaxBackground />

<section class="bg-black">
  
    <!--Personal Description-->
    <section class="header relative pt-16 items-center bg-black flex h-screen max-h-860-px">
      <div class="container mx-auto items-center flex flex-wrap">
        <div class="w-full md:w-8/12 lg:w-6/12 xl:w-6/12 px-4">
          <div class="pt-32 sm:pt-0">
            <h2 class="font-semibold text-4xl text-gray-400">
              Hi!!
            </h2>
            <p class="mt-4 text-xl leading-relaxed text-gray-400">
              My name is Rui and I'm 22 years-old.
          </p>
          <p class="mt-4 text-xl leading-relaxed text-gray-400">
              <span class="text-gray-300">MSc Software Engineering</span> student at <span  class="text-gray-300">IST</span>, Lisbon, Portugal. 
          </p>
          <p class="mt-4 text-xl leading-relaxed text-gray-400">
              I'm very passionate about <span class="text-gray-300">Artificial Intelligence</span> and Games Development.  
              It all started in my Bachelor degree at <span class="text-gray-300">UA</span>, Aveiro, Portugal, where I was from <span class="text-gray-300">2017</span> until <span  class="text-gray-300">2020</span>.
              To be more specific, it was when I had to develop the AI for the Bomberman Game. 
              In 2020, I decided to persue a Master degree to learn more about these subjects.
          </p>
          <p class="mt-4 text-xl leading-relaxed text-gray-400">
            
              I feel like I am always eager to learn more and improve each day in everything I do from programming to playing sports.
              I played basketball for 10 years and so, it is one of my passions. Music is another one. 
              Whatever I do, if i can, I enjoy having some music in the background. I also took some guitar lessons in my 12th grade. 
          </p>
          <p class="mt-4 text-xl leading-relaxed text-gray-400">
              My focus at the moment is to learn more about <span  class="text-gray-300">Data Science</span> and <span  class="text-gray-300">Machine Learning</span> 
              
          </p>
          <p class="mt-4 text-xl leading-relaxed text-gray-400">
              Feel free to reach out:
          </p>
          <p style="text-align: center;">
              <span class="text-gray-300">rufimelo99@gmail.com</span>
          </p>
  
  
            <div class="mt-12">
              <a
                href="https://www.linkedin.com/in/rui--melo/"
                target="_blank"
                class="get-started text-gray-200 font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blue-700 hover:bg-blue-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
              >
                Linkedin
              </a>
              <a
                href="https://github.com/rufimelo99"
                class="github-star ml-1 text-gray-200 font-bold px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-gray-700 hover:bg-gray-600 uppercase text-sm shadow hover:shadow-lg ease-linear transition-all duration-150"
                target="_blank"
              >
                Github
              </a>
            </div>
          </div>
        </div>
      </div>
      
      
      <p class="text-gray-200">Cool photo here pls</p>
    </section>
    <!--tools-->
    <section class="mt-48 md:mt-40 pb-40 relative bg-sky-700">
      <div
        class="-mt-20 top-0 bottom-auto left-0 right-0 w-full absolute h-20 "
        style="transform: translateZ(0);"
      >
        <svg
          class="absolute bottom-0 overflow-hidden bg-black"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          version="1.1"
          viewBox="0 0 2560 100"
          x="0"
          y="0"
        >
          <polygon
            class="text-blueGray-700 fill-current"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>

  
      <div class="container mx-auto overflow-hidden pb-20">

  
        <div class="flex flex-wrap items-center ">
          <div class="w-full md:w-6/12 px-4 mr-auto ml-auto mt-32">
            <div class="justify-center flex flex-wrap relative">
              <div class="my-4 w-full lg:w-6/12 px-4">
                
                  <div class="bg-lightBlue-600 shadow-lg rounded-lg text-center p-8 ">
                    <img
                      alt="..."
                      class="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white "
                      src="assets/img/ProgrammingLanguages/python.png"
                    />
                    <p class="text-lg text-white mt-4 font-semibold">
                      Python
                    </p>
                  </div>
                <div class="bg-orange-500 shadow-lg rounded-lg text-center p-8 mt-8">
                    <img
                      alt="..."
                      class="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                      src="assets/img/ProgrammingLanguages/java.png"
                    />
                    <p class="text-lg text-white mt-4 font-semibold">
                      Java
                    </p>
                  </div>
                <div
                    class="bg-blueGray-600 shadow-lg rounded-lg text-center p-8 mt-8"
                  >
                    <img
                      alt="..."
                      class="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                      src="assets/img/ProgrammingLanguages/Csharp.svg"
                    />
                    <p class="text-lg text-white mt-4 font-semibold">
                      C#
                    </p>
                  </div>
                  <div
                    class="bg-purple-500 shadow-lg rounded-lg text-center p-8 mt-8"
                  >
                    <img
                      alt="..."
                      class="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                      src="assets/img/ProgrammingLanguages/c.png"
                    />
                    <p class="text-lg text-white mt-4 font-semibold">
                      C
                    </p>
                  </div>
              </div>
              <div class="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                
                  <div class="bg-indigo-500 shadow-lg rounded-lg text-center p-8">
                    <img
                      alt="..."
                      class="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                      src="assets/img/ProgrammingLanguages/js.png"
                    />
                    <p class="text-lg text-white mt-4 font-semibold">
                      JavaScript
                    </p>
                  </div>
                
                
                  <div class="bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8">
                    <img
                      alt="..."
                      class="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                      src="assets/img/ProgrammingLanguages/cplus.png"
                    />
                    <p class="text-lg text-white mt-4 font-semibold">
                      C++
                    </p>
                  </div>
                
                  <div
                    class="bg-red-800 shadow-lg rounded-lg text-center p-8 mt-8"
                  >
                    <img
                      alt="..."
                      class="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white"
                      src="assets/img/ProgrammingLanguages/ts.png"
                    />
                    <p class="text-lg text-white mt-4 font-semibold">
                      TypeScripts
                    </p>
                  </div>
                  
              </div>
            </div>
          </div>
  
          <div class="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-48">
            <h3 class="text-3xl mb-2 font-semibold leading-normal text-gray-400">
              Programming Languages
            </h3>
            <p class="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-400">
              Some programming languages that I have worked with.
            </p>
          </div>
        </div>
  
        
      </div>
      
      
      <div class="justify-center text-center flex flex-wrap mt-24">
        <div class="w-full md:w-6/12 px-12 md:px-4">
          <h3 class="text-3xl mb-2 font-semibold leading-normal text-gray-400">
            Projects
          </h3>
          <p class="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-400">
            Some projects that I have worked on during University
          </p>
        </div>
      </div>
    </section>
  
  
    <!--Projects-->
    <section class="block relative z-1 bg-blueGray-800">
      <div class="container mx-auto">
        <div class="justify-center flex flex-wrap">
          <div class="w-full lg:w-12/12 px-4 -mt-24">
            <div class="flex flex-wrap">
              <div class="w-full lg:w-4/12 px-4">
  
                <a href="https://github.com/rufimelo99/UltimatumGame">
                  <div
                    class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-blueGray-600 w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
                  >
                    <img
                      alt="..."
                      class="align-middle border-none max-w-full h-auto rounded-lg"
                      src="assets/img/Projects/UltimatumGame.JPG"
                    />
                    <p class="px-2 py-2 text-blueGray-300 font-bold">Ultimatum Game in Complex Networks</p>
                    <p class="px-2 py-2 text-blueGray-300 font-thin">ipynb, NetworkX</p>
                    <p class="px-2 py-2 text-blueGray-300 leading-relaxed ">This project consists in studying and simulating Erdős–Rényi and Scale-Free Networks when playing the Ultimatum Game, which is a Socio-Economic Game. 
                      It was an individual project that allowed to understand how humans react to unfair situations and their willingness to accept those.</p>
                    <p class="px-2 py-2 text-blueGray-300 font-extrathin">Oct 2021 – Nov 2021</p>
                    
                    </div>
                  
                </a>
              </div>
    
              <div class="w-full lg:w-4/12 px-4">
  
                <a href="https://github.com/rufimelo99/UltimateChess">
                  <div
                    class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-blueGray-600 w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
                  >
                    <img
                      alt="..."
                      class="align-middle border-none max-w-full h-auto rounded-lg"
                      src="assets/img/Projects/MNIST.JPG"
                    />
                    <p class="px-2 py-2 text-blueGray-300 font-bold">MNIST study</p>
                    <p class="px-2 py-2 text-blueGray-300 font-thin">ipynb, Python, TensorFlow (Keras)</p>
                    <p class="px-2 py-2 text-blueGray-300 leading-relaxed ">Use of different neural network architectures on the test set of the famous MNIST data set. Individual. I was responsible for creating the models and study their performance in order to create a paper</p>
                    <p class="px-2 py-2 text-blueGray-300 font-extrathin">May 2021 – Jun 2021</p>
                    
                    </div>
                  
                </a>
              </div>
  
              <div class="w-full lg:w-4/12 px-4">
  
                <a href="https://github.com/rufimelo99/Captivity">
                  <div
                    class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-blueGray-600 w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
                  >
                    <img
                      alt="..."
                      class="align-middle border-none max-w-full h-auto rounded-lg"
                      src="assets/img/Projects/Captivity.png"
                    />
                    <p class="px-2 py-2 text-blueGray-300 font-bold">Captivity</p>
                    <p class="px-2 py-2 text-blueGray-300 font-thin">Unity, C#</p>
                    <p class="px-2 py-2 text-blueGray-300 leading-relaxed ">2D Game, co-op medieval adventure game for Windows PC with a bird’s-eye view perspective. 4 team members. I was responsible for structuring the project and implement modules to be used when constructing levels.</p>
                    <p class="px-2 py-2 text-blueGray-300 font-extrathin">Feb 2021 – Jun 2021</p>
                    
                    </div>
                  
                </a>
              </div>
    
              <div class="w-full lg:w-4/12 px-4">
  
                <a href="https://github.com/rufimelo99/AASMA">
                  <div
                    class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-blueGray-600 w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
                  >
                    <img
                      alt="..."
                      class="align-middle border-none max-w-full h-auto rounded-lg"
                      src="assets/img/Projects/AASMA.JPG"
                    />
                    <p class="px-2 py-2 text-blueGray-300 font-bold">Self-driving Agents Adapting to a City</p>
                    <p class="px-2 py-2 text-blueGray-300 font-thin">Python, Pygame</p>
                    <p class="px-2 py-2 text-blueGray-300 leading-relaxed ">3D Simulation of a small City where uber/taxi drivers would learn where to position themselves better to maximize their profits. 3 team members. I was responsible for structuring the project, implement the overall backend and Q-learning reinforcement learning algorithm.</p>
                    <p class="px-2 py-2 text-blueGray-300 font-extrathin">Apr 2021 – May 2021</p>
                    
                    </div>
                  
                </a>
              </div>
    
              <div class="w-full lg:w-4/12 px-4">
  
                <a href="https://github.com/rufimelo99/UltimateChess">
                  <div
                    class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-blueGray-600 w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
                  >
                    <img
                      alt="..."
                      class="align-middle border-none max-w-full h-auto rounded-lg"
                      src="assets/img/Projects/UltimateChess.png"
                    />
                    <p class="px-2 py-2 text-blueGray-300 font-bold">Ultimate Chess</p>
                    <p class="px-2 py-2 text-blueGray-300 font-thin">Unity, C#, ML-agents, TensorFlow</p>
                    <p class="px-2 py-2 text-blueGray-300 leading-relaxed ">3D Chess Game with Agents that would learn through reinforcement learning. In- dividual. I was responsible for structuring the project, create the functional game with menu and make use of ML-Agents package to train the agent by making it play against itself and visualize the process using TensorFlow</p>
                    <p class="px-2 py-2 text-blueGray-300 font-extrathin">Dec 2020 - Jan 2021</p>
                    
                    </div>
                  
                </a>
              </div>
  
              <div class="w-full lg:w-4/12 px-4">
  
                <a href="https://github.com/rufimelo99/ML_SimpleJump">
                  <div
                    class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-blueGray-600 w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
                  >
                    <img
                      alt="..."
                      class="align-middle border-none max-w-full h-auto rounded-lg"
                      src="assets/img/Projects/simpleJump.png"
                    />
                    <p class="px-2 py-2 text-blueGray-300 font-bold">ML_SimpleJump</p>
                    <p class="px-2 py-2 text-blueGray-300 font-thin">Unity, C#, ML-agents, TensorFlow</p>
                    <p class="px-2 py-2 text-blueGray-300 leading-relaxed ">Small project that aimed to make a cube jump. It was done simply to learn the ML-agents package and develop the Ultimate Chess project</p>
                    <p class="px-2 py-2 text-blueGray-300 font-extrathin">Dec 2020</p>
                    
                    </div>
                  
                </a>
              </div>
    
              <div class="w-full lg:w-4/12 px-4">
  
                <a href="https://github.com/rufimelo99/LegoInteractive">
                  <div
                    class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-blueGray-600 w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
                  >
                    <img
                      alt="..."
                      class="align-middle border-none max-w-full h-auto rounded-lg"
                      src="assets/img/Projects/lego.JPG"
                    />
                    <p class="px-2 py-2 text-blueGray-300 font-bold">Lego Interactive</p>
                    <p class="px-2 py-2 text-blueGray-300 font-thin">OpenGL, C++</p>
                    <p class="px-2 py-2 text-blueGray-300 leading-relaxed ">Software able to simulate and interact with legos. 4 team members.</p>
                    <p class="px-2 py-2 text-blueGray-300 font-extrathin">Jan 2020 – Jun 2020</p>
                    
                    </div>
                  
                </a>
              </div>
              <div class="w-full lg:w-4/12 px-4">
  
                <a href="https://github.com/DanielMoreiraPT/ComputeFlow">
                  <div
                    class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-blueGray-600 w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
                  >
                    <img
                      alt="..."
                      class="align-middle border-none max-w-full h-auto rounded-lg"
                      src="assets/img/Projects/Flow.JPG"
                    />
                    <p class="px-2 py-2 text-blueGray-300 font-bold">Compute Flow</p>
                    <p class="px-2 py-2 text-blueGray-300 font-thin">Svelte, TS, npm, electron</p>
                    <p class="px-2 py-2 text-blueGray-300 leading-relaxed ">Software able to provide an intuitive and interactive Interface for flow programming. 4 team members. I was responsible for creating the UI using Svelte and Typescript</p>
                    <p class="px-2 py-2 text-blueGray-300 font-extrathin">Jan 2020 – Jun 2020</p>
                    
                    </div>
                  
                </a>
              </div>
    
              <div class="w-full lg:w-4/12 px-4">
  
                <a href="https://github.com/rufimelo99/bomberman-ai">
                  <div
                    class="hover:-mt-4 relative flex flex-col min-w-0 break-words bg-blueGray-600 w-full mb-6 shadow-lg rounded-lg ease-linear transition-all duration-150"
                  >
                    <img
                      alt="..."
                      class="align-middle border-none max-w-full h-auto rounded-lg"
                      src="assets/img/Projects/bombermanAI.JPG"
                    />
                    <p class="px-2 py-2 text-blueGray-300 font-bold">Bomberman AI</p>
                    <p class="px-2 py-2 text-blueGray-300 font-thin">Pygame, python</p>
                    <p class="px-2 py-2 text-blueGray-300 leading-relaxed ">In this project, I was responsible for applying the A* algorithm and develop the decision-making for the player (bot)</p>
                    <p class="px-2 py-2 text-blueGray-300 font-extrathin">Nov 2019 – Dec 2019</p>
                    
                    </div>
                  
                </a>
              </div>
    
            </div>
          </div>
        </div>
      </div>
    </section>
    
    
    
    
  </section>

   


  <Footer />