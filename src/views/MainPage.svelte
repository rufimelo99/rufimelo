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
    import PersonalDescription from "../components/PersonalDescription.svelte";
    import Languages from "../components/Languages.svelte";
    import Projects from "../components/Projects.svelte";

</script> 

<IndexNavbar />
<ParallaxBackground />

<section class="bg-black">
  
    <!--Personal Description-->
    <PersonalDescription />
    <!--tools-->
    <Languages />
  
  
    <!--Projects-->
    <Projects />
    
    
    
    
    
  </section>

   


  <Footer />