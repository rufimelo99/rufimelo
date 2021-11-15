<script>
    import ProgressBar from "@okrad/svelte-progressbar";
    import Header from "../Components/Header.svelte";
    
  </script>
<div class="container">
    <div class="header">
        <Header title={"Languages"} body={""}></Header>
    </div>
    <div class="grid">
        <div class="row">
            <div class="column">
                <div class="Project">
                    <img src="assets/python.png" alt="">
                    <progress value={0.8}></progress>
                </div>
                <div>
                    <img src="assets/java.png" alt="">
                    <progress value={0.6}></progress>
                </div>
            
            </div>
            <div class="column">
                <div class="Project">
                    <img src="assets/Csharp.svg" alt="">
                    <progress value={0.6} ></progress>
                </div>
                <div class="Project">
                    <img src="assets/cplus.png" alt="">
                    <progress value={0.4}></progress>
                </div>
                
            </div>
            <div class="column">
                <div class="Project">
                    <img src="assets/c.png" alt="">
                    <progress value={0.4}></progress>
                </div>
                <div class="Project">
                    <img src="assets/js.png" alt="">
                    <progress value={0.4}></progress>
                </div>
                
            </div>
            <div class="column">
                <div class="Project">
                    <img src="assets/ts.png" alt="">
                    <progress value={0.4}></progress>
                </div>
        
            </div>
        </div>
    </div>

    
    
    
    
</div>

  <style>

.Project{
    
  margin-left: auto;
  margin-right: auto;
}
img{
    
  margin-left: 25%;
  margin-right: 25%;
}
progress{  
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
.column progress {
    width: 50%;
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