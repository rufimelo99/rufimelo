<script>
    import ProgressBar from "@okrad/svelte-progressbar";
    import Header from "../Components/Header.svelte";
    
  </script>
<div class="container">
    <div class="header">
        <Header title={"Projects (section to be edited )"} body={""}></Header>
    </div>
    <div class="grid">
        <div class="row">
            <div class="column">
                <div class="gridProject container">
                    <div class="row">
                        <a href="https://github.com/rufimelo99/UltimatumGame">
                            <img src="assets/Projects/UltimatumGame.JPG" alt="">
                        </a>
                    </div>
                    <div class="row">
                        <h4 style="text-align: center;">Ultimatum Game in Complex Networks</h4>
                    </div>
                    <div class="row">
                        <span>ipynb, NetworkX </span>
                    </div>
                    <div class="row">
                        <span>Graph-theory, Socio-Economic Networks, Mathematical Economics, Network Dynamics, Game Theory   </span>
                    </div>
                    <div class="row">
                        <span>Oct 2021 – Nov 2021</span>
                    </div>
                </div>
                <div class="gridProject container">
                    <div class="row" style="padding-bottom:4vh">
                        <img src="assets/ua.png" alt="">
                    </div>
                    <div class="row">
                        <h4 style="text-align: center;">Captivity</h4>
                    </div>
                    <div class="row">
                        <span>Unity, C#  </span>
                    </div>
                    <div class="row">
                        <span>2D co-op Medieval Game  </span>
                    </div>
                    <div class="row">
                        <span>Feb 2021 – Jun 2021</span>
                    </div>
                </div>
            
            </div>
            <div class="column">
                <div class="gridProject container">
                    <div class="row" style="padding-bottom:4vh">
                        <img src="assets/ua.png" alt="">
                    </div>
                    <div class="row">
                        <h4 style="text-align: center;">Self-driving Agents Adapting to a City</h4>
                    </div>
                    <div class="row">
                        <span>Python, Pygame </span>
                    </div>
                    <div class="row">
                        <span>Reinforcement Learning (Q-learning), Autonomous Agents, Multi-Agent Systems  </span>
                    </div>
                    <div class="row">
                        <span>Apr 2021 – May 2021</span>
                    </div>
                </div>
                <div class="gridProject container">
                    <div class="row" style="padding-bottom:4vh">
                        <img src="assets/ua.png" alt="">
                    </div>
                    <div class="row">
                        <h4 style="text-align: center;">MNIST study</h4>
                    </div>
                    <div class="row">
                        <span>ipynb, Python, TensorFlow (Keras)</span>
                    </div>
                    <div class="row">
                        <span>Deep Learning (Feedforward and Convolutional Neural Networks)</span>
                    </div>
                    <div class="row">
                        <span>May 2021 – Jun 2021</span>
                    </div>
                </div>
                
            </div>
            <div class="column">
                <div class="gridProject container">
                    <div class="row" style="padding-bottom:4vh">
                        <img src="assets/ua.png" alt="">
                    </div>
                    <div class="row">
                        <h4 style="text-align: center;">Compute Flow</h4>
                    </div>
                    <div class="row">
                        <span>Svelte, TS, npm, electron</span>
                    </div>
                    <div class="row">
                        <span>UI/UX</span>
                    </div>
                    <div class="row">
                        <span>Jan 2020 – Jun 2020</span>
                    </div>
                </div>
                
                
            </div>
            <div class="column">
                <div class="gridProject container">
                    <div class="row" style="padding-bottom:4vh">
                        <img src="assets/ua.png" alt="">
                    </div>
                    <div class="row">
                        <h4 style="text-align: center;">Ultimate Chess</h4>
                    </div>
                    <div class="row">
                        <span >Unity, C#, ML-agents, TensorFlow </span>
                    </div>
                    <div class="row">
                        <span>Reinforcement Learning</span>
                    </div>
                    <div class="row">
                        <span>Dec 2020 - Jan 2021</span>
                    </div>
                </div>
                
                
            </div>

        </div>
    </div>

    
    
    
</div>
 

  <style>
      span{
          text-align: left;
      }

  img{
      
    margin-left: 25%;
    margin-right: 25%;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
  }
  .container {
    padding-top: 8vh;
  }
  
  /* Create four equal columns that sits next to each other */
  .column {
    flex: 25%;
    max-width: 25%;
    padding: 0 4px;
    padding-top: 2vh;
    
  }
  
  .column img {
    margin-top: 8px;
    vertical-align: middle;
    width: 50%;
    height: 50%;
  }

  /* Responsive layout - makes a two column-layout instead of four columns */
  @media screen and (max-width: 800px) {
    .column {
      flex: 50%;
      max-width: 50%;
    }
  }
  
  /* Responsive layout - makes the two columns stack on top of each other instead of next to each other */
  @media screen and (max-width: 600px) {
    .column {
      flex: 100%;
      max-width: 100%;
    }
  }
   
  </style>