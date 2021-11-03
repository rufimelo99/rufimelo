<script>
    import Canvas from './Canvas.svelte'
    import { Module, Port, Connection, Chart } from './StructureLogic';
    import { createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    
    let ChartStruc = new Chart("Resumé");
    
    let myCanvas;
    
</script>
    <Canvas bind:this={myCanvas}
        ChartStruc={ChartStruc}
        />
