<script>
    import {draggable} from './draggable'
    import ModuleHeader from './ModuleHeader.svelte'
    import ModuleContent from './ModuleContent.svelte'

    import { createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher(); 
    
    export let StrucModule;

    $:xPos = StrucModule.xPos;
    $:yPos = StrucModule.yPos;
    $:moduleName = StrucModule.name;
    $:moduleWidth = StrucModule.getModuleWidth();
    $:moduleHeight = StrucModule.getModuleHeight();
    
    export let headerColor;

    //if i want to access rect from component's parent (chart) -> add export
    let rect;

    //draggable vars
	let dx = 0;
    let dy = 0;
    
    //in order to set x and y pos correctly on the module, we need to revert previous transformations changes (dx, dy)
    let lastdx = 0;
    let lastdy = 0;

 
	const handleConnectionStart = (e) => {
        //console.log("FlowModulev2 -> connection start handler")
        let {xInitial, xFinal, yInitial, yFinal, port} = e.detail;
        dispatch('handleConnectionStart', {
                    xInitial: {xInitial},
                    xFinal: {xFinal},
                    yInitial: {yInitial},
                    yFinal: {yFinal},
                    port: {port},
                    parentModule : {StrucModule}
                });
		
    }   
	const handleConnectionDrag = (e) => {
        let {xInitial, xFinal, yInitial, yFinal, port} = e.detail;
        dispatch('handleConnectionDrag', {
                    xInitial: {xInitial},
                    xFinal: {xFinal},
                    yInitial: {yInitial},
                    yFinal: {yFinal},
                    port: {port},
                    parentModule : {StrucModule}
                });
		
    }
	const handleConnectionEnd = (e) => {
        let {xInitial, xFinal, yInitial, yFinal, port} = e.detail;
        dispatch('handleConnectionEnd', {
                    xInitial: {xInitial},
                    xFinal: {xFinal},
                    yInitial: {yInitial},
                    yFinal: {yFinal},
                    port: {port},
                    parentModule : {StrucModule}
                });
    }
    const handleDragStart = (e) => {
        rect.setAttribute('stroke', '#E7DFDD');
        rect.setAttribute('stroke-width', '10px');
    }
    const handleDragMove = (e) => {
        let { lastX:lastX, lastY:lastY, dx: _dx, dy: _dy } = e.detail;
		dx += _dx;
        dy += _dy;
        StrucModule.xPos=xPos+dx-lastdx;
        StrucModule.yPos=yPos+dy-lastdy;
        dx=0;
        dy=0;
        
        
        dispatch('handleDragMove', {    
                    Module: {StrucModule},
                    lastX: {lastX},
                    lastY: {lastY},
                    dx: {dx},
                    dy: {dy}
                });
        
        lastdx = dx;
        lastdy = dy;    
        
    }
    const handleDragEnd = (e) => {
        let {lastX, lastY} = e.detail
        rect.setAttribute('stroke', 'green');
        rect.setAttribute('stroke-width', '0px');
        
        dispatch('handleDragEnd');
        
        lastdx = 0;
        lastdy = 0; 
        
        
    }



    const handleDblClick = (e) => {
        dispatch('DblclickModule', {
            moduleClicked: StrucModule
                });
        }
</script><g class="node-container" 
transform={`translate(${dx} ${dy})`}
on:dblclick={handleDblClick}>    
<rect
    bind:this={rect} 
    class="node-background" 
    x={xPos} 
    y={yPos} 
    width={moduleWidth} 
    height={moduleHeight} 
    rx="6" 
    ry="6" 
    />	
    
    <g  use:draggable  
        on:dragmove={handleDragMove}
        on:dragstart={handleDragStart}   
        on:dragend={handleDragEnd}
        >
        <ModuleHeader
            StrucModule={StrucModule}
            color={headerColor}
        />
        <ModuleContent
            StrucModule={StrucModule}
            on:handleConnectionStart={handleConnectionStart}
            on:handleConnectionDrag={handleConnectionDrag}
            on:handleConnectionEnd={handleConnectionEnd}
        />
    </g>
 
</g>
<style>
.node-container {
cursor: move;
}
.node-background {
fill: #1a1c1d;
}
</style>