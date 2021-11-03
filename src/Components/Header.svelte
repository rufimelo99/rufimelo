<script>
    export let title;
    export let body;
</script>
<div class="grid-container">
    <div class="description">
        <h1>
            {title} 
        </h1>
        <p1>
            {body}
        </p1>
    </div>
</div>
<style>
    .description{
        color: rgb(119, 168, 180);
        font-family: 'opensans-regular', sans-serif;
        font-size: 30px;
        padding-left: 5%;
    }
    .grid-container{
        display: grid;
        grid-template-columns: 30% 50% 20% ;
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