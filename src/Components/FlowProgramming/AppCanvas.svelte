<script>
    import Canvas from './Canvas.svelte'
    import { Module, Port, Connection, Chart } from './Scripts/StructureLogic';
    import { createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    
    let ChartStruc = new Chart("Resumé");
    
    let myCanvas;
    
</script>
<div class="grid-container">
    <div></div>

    <div class="description">
    <Canvas bind:this={myCanvas}
        ChartStruc={ChartStruc}
        /></div>

    <div></div>
</div>
<style>
    .description{
        color: rgb(119, 168, 180);
        font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
        font-size: 15px;
        height: 1000px;
    }
    .grid-container{
        display: grid;
        grid-template-columns: 10% 80% 10% ;
        min-height: 1000px;
        align-content: center;
    }
</style>