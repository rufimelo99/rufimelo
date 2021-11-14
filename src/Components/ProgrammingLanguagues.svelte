<script>
    import ProgressBar from "@okrad/svelte-progressbar";
    
  </script>
<div class="container">

    <h1 class="description">
        Languages
    </h1>
    <div class="grid">
        <!--
        <ProgressBar
            style='radial'
            textSize=60
            series={[70]}
        ></ProgressBar>        
          -->
        <div>
            <img src="assets/python.png" alt="">
            <progress value={0.8}></progress>
        </div>
        <div>
            <img src="assets/java.png" alt="">
            <progress value={0.6}></progress>
        </div>
        <div>
            <img src="assets/Csharp.svg" alt="">
            <progress value={0.6} ></progress>
        </div>
        <div>
            <img src="assets/cplus.png" alt="">
            <progress value={0.4}></progress>
        </div>
        <div>
            <img src="assets/c.png" alt="">
            <progress value={0.4}></progress>
        </div>
        <div>
            <img src="assets/js.png" alt="">
            <progress value={0.4}></progress>
        </div>
        <div>
            <img src="assets/ts.png" alt="">
            <progress value={0.4}></progress>
        </div>
        
    </div>

    
    
    
    
</div>

  <style>
img{
    padding-bottom: 30%;
}
progress {
    width: 100%;
}
.grid {
	 display: grid;
     width: 100%;
	 grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
	 grid-gap: 1rem;
     padding-bottom: 30%;
}
 .grid > div {
	 background: black;
	 padding: 1rem;
	 position: relative;
}
 .grid > div::before {
	 content: "";
	 display: block;
	 padding-bottom: 100%;
}
 .grid > div img {
	 position: absolute;
	 max-width: 100%;
	 top: 50%;
	 left: 50%;
	 transform: translate(-50%, -50%);
}
.description{
    color: rgb(119, 168, 180);
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    padding-right: 2px;
    padding-bottom: 10%;
}
.grid-container{
    display: grid;
    grid-template-columns: 10% 60% 20% 10% ;
    align-content: center;
}
.personalPhotoGrid{
    text-align: center;
}

.texthighlighted{
    color: rgb(123, 229, 255);
}
 
  </style>