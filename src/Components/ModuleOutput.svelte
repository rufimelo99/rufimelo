<script>
    import { Module, Port, Connection } from './StructureLogic';
	import { connections } from './connections';
    
    import { createEventDispatcher} from 'svelte'; 	
    const dispatch = createEventDispatcher();

    //corresponds to the number of the port, of its the 1st, 2nd,...
	export let portNumber;
	export let port;
    export let StrucModule;

	let space = ' ';
    
    $:xPos = StrucModule.xPos;
    $:yPos = StrucModule.yPos;
    $:moduleWidth = StrucModule.getModuleWidth();
    $:varType = port.varType;
    $:varName = port.varName;
    $:cx = xPos+moduleWidth-11;
    $:cy = yPos+10;
    $:portLabelX = xPos+moduleWidth-24;
    $:portLabelY = yPos+14;
    $:transformValue = 50+(25*portNumber);
    $:cyRealValue = cy+transformValue;

	$:port.xPos=parseInt(StrucModule.xPos)+parseInt(StrucModule.getModuleWidth())-11;
	$:port.yPos=parseInt(StrucModule.yPos)+10+50+(25*portNumber);
    $:port.id=portNumber;
	port=port

	
	
</script>


<g class="output-field" transform="translate(0, {transformValue})">
    <g class="port" >
        <circle class="port-outer" cx={cx} cy={cy} r="7.5" />
        <circle class="port-inner" cx={cx} cy={cy} r="5" />
        <circle class="port-scrim" cx={cx} cy={cy} r="7.5" />
    </g>
    <text class="port-label" x={portLabelX} y={portLabelY}>{varType} {space} {varName}</text>
</g>




<style>
	.port {
	cursor: pointer;
	}
	.port-scrim {
	fill: transparent;
	}
	.port-outer {
	fill: #000000;
	}
	.port-inner {
	fill: #ffffff;
	}
	.port-label {
	font-size: 12px;
	fill: #fff;
	}
	.input-field .port-label {
	text-anchor: start;
	}
	.output-field .port-label {
	text-anchor: end;
	}
</style>