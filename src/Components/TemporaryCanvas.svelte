<script>
    import Module from './Module.svelte';
</script>
<svg>
    <g>
        <Module
        xPos={10}
        yPos={10}
        moduleHeight={100}
        moduleWidth={100}
                >
        </Module>
</svg>
<style>
    svg{
        background-color:#b3b3b3;
        width: 100%; 
        height: 100%;
    }
	circle { fill: rgb(255, 255, 255); opacity:1;z-index: 1 }
	circle:hover { fill: rgb(255, 255, 255); opacity:1;z-index: 1}
</style>