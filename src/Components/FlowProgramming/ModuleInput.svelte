
<script >
    import { Module, Port, Connection } from './Scripts/StructureLogic';
	import { connections } from './Scripts/connections';

    import { createEventDispatcher} from 'svelte';
	import { debug } from 'svelte/internal';
    const dispatch = createEventDispatcher();

    //corresponds to the number of the port, of its the 1st, 2nd,...
	export let portNumber;
	export let port;
  	export let StrucModule;
	let space = ' ';


    $:xPos = StrucModule.xPos;
    $:yPos = StrucModule.yPos;
    $:varType = port.varType;
    $:varName = port.varName;
    $:cx = xPos+15;
    $:cy = yPos+10;
    $:portLabelX = xPos+28;
    $:portLabelY = yPos+14;
    $:transformValue = 50+(25*portNumber);
    $:cyRealValue = cy+transformValue;

	//console.log(StructModule)
	port.xPos=parseInt(xPos)+15;
	port.yPos=parseInt(yPos)+10+50+(25*portNumber);
	port.id=portNumber;
	port=port;


	
</script>



<g class="input-field" transform="translate(0, {transformValue})">
	<g class="port">
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
</style>
