<script>
    export let title;
    export let body;
</script>
<div class="grid-container">
    <div></div>
    <div class="description">
        <h1>
            {title} 
        </h1>
        <h7>
            {body}
        </h7>
    </div>
    <div></div>
</div>
<style>
    
    .description{
        color: rgb(119, 168, 180);
        font-family: 'opensans-regular', sans-serif;
        font-size: 25px;
    }
    .grid-container{
        display: grid;
        grid-template-columns: 10% 80% 10% ;
        align-content: center;
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