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
    <h3>
        I'm very passionate about <span class="texthighlighted">Artificial Intelligence</span> and Games Development. I always try to learn more and improve each day in everything I do from programming to playing sports.
    </h3>
    <h3>
        I played basketball for 10 years and so, it is one of my passions. Music is other one. Whatever I do, if i can, i enjoy having some music in the background. I also took some guitar lessons in my 12th grade. 
    </h3>
    </div>
    <div class="personalPhotoGrid">
        <img src="assets/Melo.jpeg" alt='' class="personalPhoto">
    </div>
</div>
<style>
    .description{
        color: rgb(119, 168, 180);
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 15px;
    }
    .grid-container{
        display: grid;
        grid-template-columns: 10% 60% 20% 10% ;
        align-content: center;
    }
    .personalPhotoGrid{
        text-align: center;
    }
    .personalPhoto{
        padding-right: 5%;
        height: 100%; 
        width: 100%; 
        /*border-radius: 50%;*/
    }
    .texthighlighted{
        color: rgb(123, 229, 255);
    }
</style>