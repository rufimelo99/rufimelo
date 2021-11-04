<script>
    import ModuleInput from './ModuleInput.svelte';
    import ModuleOutput from './ModuleOutput.svelte';
    import { Module, Port, Connection } from '../Scripts/StructureLogic';
    import { createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();
       
    export let StrucModule;
   
    $:xPos = StrucModule.xPos;
    $:yPos = StrucModule.yPos;
    $:moduleWidth = StrucModule.getModuleWidth();
    $:InputList = StrucModule.inputList;
    $:OutputList = StrucModule.outputList;
    //it changes due to the number of inputs
    $:contentHeight = StrucModule.getContentHeight()-5;
    $:contentHeightRect = contentHeight-5;
    //if needed to change or adjust the background of the content
    
    $:contentRectX = xPos+2;
    $:contentRectY = yPos+44;//40 is the header size... can make it a attribute later //TODO


	
</script>

<g class="node-content">
    <rect class="content-round-rect" width={moduleWidth} height={contentHeight} x={contentRectX} y={contentRectY} rx="4" ry="4" />
    <rect class="content-rect" width={moduleWidth} height={contentHeightRect}  x={contentRectX} y={contentRectY} />
    <g class="inputs">	
        
        {#each InputList as item, i (i)}
            <ModuleInput
                port={item}
                portNumber={i} 
                StrucModule={StrucModule} />
        {/each}
    </g>
    
    <g class="outputs">
        
        {#each OutputList as item, i (i)}
            <ModuleOutput
                port={item}
                portNumber={i} 
                StrucModule={StrucModule} />
        {/each}  
    </g>
    
</g>

<style>
	.node-content {
	fill: rgb(117, 117, 117);
	}
</style> 