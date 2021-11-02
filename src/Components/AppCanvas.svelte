<script>
    import Canvas from './Canvas.svelte'
    import { Module, Port, Connection, Chart } from './StructureLogic';
    import Button from './Button.svelte';
    import { createEventDispatcher} from 'svelte';
    import { ChartHistory} from './stores';

    const dispatch = createEventDispatcher();


    let ChartStruc = new Chart("Resumé");

    let __HistoryChart = new ChartHistory();

    export function tryToLoadProject(){
        const {dialog} = require("electron").remote;
        let filename = dialog.showSaveDialogSync()
        if(filename === undefined){
            console.log("filename undefined");
            return;
        }else{
            let filenameSplited=filename.split('.');
            let file=filenameSplited[0];
            let extension=filenameSplited[1];
            if(extension=="json"){
                var path = require('path');

                let filePath=filename;
                let ProjectName=file.split('/').pop();
                let ProjectPath=filename;
                ChartStruc = new Chart(file);
                fs.readFile(filePath, function(err,data){
                    if (!err) {
                        let json = JSON.parse(data);
                        let ModulesList=[];
                        for(let i=0; i<json.Modules.length; i++){
                            let inputlist=[];
                            let outputlist=[];
                            for(let j=0; j<json.Modules[i].IO.Inputs.length; j++){
                                let InputObject = new Port(true,json.Modules[i].IO.Inputs[j].PortType , json.Modules[i].IO.Inputs[j].VarName)
                                inputlist.push(InputObject)
                            }
                            for(let h=0; h<json.Modules[i].IO.Outputs.length; h++){
                                let OutputObject = new Port(false,json.Modules[i].IO.Outputs[h].PortType , json.Modules[i].IO.Outputs[h].VarName)
                                outputlist.push(OutputObject)
                            }

                            let FlowModuleObject = new Module(json.Modules[i].Id, json.Modules[i].Name, json.Modules[i].Coord.CoordX,  json.Modules[i].Coord.CoordY);

                            FlowModuleObject.functionId=json.Modules[i].FunctionID;
                            FlowModuleObject.addOutputs(outputlist)
                            FlowModuleObject.addInputs(inputlist)
                            FlowModuleObject.setModuleWidth();
                            FlowModuleObject.setModuleHeight();
                            FlowModuleObject.setPortCoords();

                            if(json.Modules[i].Variables){
                                FlowModuleObject.listVariables=json.Modules[i].Variables;
                            }
                            ModulesList.push(FlowModuleObject);

                            ChartStruc.addModule(FlowModuleObject);

                        }

                        for(let i=0; i<json.Modules.length; i++){
                            let inputConnectionslist=[];
                            let outputConnectionslist=[];
                            for(let j=0; j<json.Modules[i].Connections.Inputs.length; j++){
                                //correto
                                let InputObject  = ModulesList[i].inputList[json.Modules[i].Connections.Inputs[j].InputPort];
                                let InputModule  = ModulesList[i];

                                let OutputModule  = ModulesList[json.Modules[i].Connections.Inputs[j].ModuleID];
                                let OutputObject  = OutputModule.outputList[json.Modules[i].Connections.Inputs[j].ModulePort];

                                let connection = new Connection('connectionX', InputObject, true, InputModule);


                                connection.setConnectedPort(OutputObject, OutputModule);

                                connection.calculateCurve();

                                InputModule.addInputConnection(InputObject, OutputObject, OutputModule ,connection);
                                OutputModule.addOutputConnection(OutputObject, InputObject, InputModule ,connection);

                                ChartStruc.addFinalConnection(connection);
                            }

                        }
                        ChartStruc=ChartStruc;


                        //history
                        __HistoryChart.clear();

                        dispatch('fileWasLoadedCorrectly', {
                            ProjectName: {ProjectName},
                            ProjectPath: {ProjectPath}
                        });

                    } else {
                        console.log(err);
                    }
                });
            }else{
                alert("Wrong file extension");
            }
                }
    }

    let myCanvas;

    export function handleWrongTypes(){
        dispatch("wrongTypes");
    }

</script>
    <Canvas bind:this={myCanvas}
        on:wrongTypes={handleWrongTypes}
        ChartStruc={ChartStruc}
        {__HistoryChart}
        />
