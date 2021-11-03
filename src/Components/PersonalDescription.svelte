<div class="grid-container">
    <div></div>
    <div class="description">
    <h1>
        Hello there!
    </h1>
    <h3>
        My name is Rui and I'm 22 years-old.
    </h3>
    <h3>
        <span class="texthighlighted">MSc Software Engineering</span> student at <span class="texthighlighted">IST</span>, Lisbon, Portugal
    </h3>
    <p>
        I'm very passionate about <span class="texthighlighted">Artificial Intelligence</span> and Games Development. I always try to learn more and improve each day in everything I do from programming to playing sports.I played basketball for 10 years and so, it is one of my passions.
    </p>
    </div>
    <div class="personalPhotoGrid">
        <img src="assets/Melo.jpeg" alt='' class="personalPhoto">
    </div>
</div>
<style>
    .description{
        color: rgb(119, 168, 180);
        font-family: 'opensans-regular', sans-serif;
        font-size: 15px;
    }
    .grid-container{
        display: grid;
        grid-template-columns: 10% 60% 30% ;
        align-content: center;
    }
    .personalPhotoGrid{
        text-align: center;
    }
    .personalPhoto{
        height: 100%; 
        width: 100%; 
        /*border-radius: 50%;*/
    }
    .texthighlighted{
        color: rgb(123, 229, 255);
    }
</style>