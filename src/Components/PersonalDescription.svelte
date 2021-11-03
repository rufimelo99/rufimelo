<div class="grid-container">
    <div class="personalPhotoGrid">
        <img src="assets/me.jpg" alt='' class="personalPhoto">
    </div>
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
</div>
<style>
    .description{
        color: rgb(119, 168, 180);
        font-family: 'opensans-regular', sans-serif;
    }
    .grid-container{
        display: grid;
        grid-template-columns: 30% 50% 20% ;
        align-content: center;
        font-size:x-large;
    }
    .personalPhotoGrid{
        text-align: center;
    }
    .personalPhoto{
        height: 80%; 
        width: 80%; 
        border-radius: 50%;
    }
    .texthighlighted{
        color: rgb(123, 229, 255);
    }
</style>