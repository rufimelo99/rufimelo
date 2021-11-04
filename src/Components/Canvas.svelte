<script>
    import MyModule from './Module.svelte';
    import ConnectionSVG from './ConnectionSVG.svelte'
    //Classes
    import { Module, Port, Connection, Chart } from './StructureLogic';
    import { createEventDispatcher} from 'svelte';
    const dispatch = createEventDispatcher();

    export let ChartStruc;
    console.log(ChartStruc);
    //TODO allow dragging the chart --> need to chage values here and send it somehow to the modules so handlers can work properly
    let dx = 0;
    let dy = 0;


    //ggotta be global and export from app maybe.. so other "apps" can access
    var connections=[];

    //verify if given coords represent a port and if it has certain PortType //TODO O(n**2) not a good thing
    function verifyCoordsIsPortFromType(CoordX, CoordY, originalPort, originalModule){
        for(let module of ChartStruc.ModuleList){
            //se a porta inicial for input so vamos avaliar outputs e vice versa
            if(originalPort.isInput == false){
                for(let input of module.inputList){
                    if(input.xPos - input.hiboxSize <= CoordX  && input.xPos + input.hiboxSize >= CoordX  ){
                        if(input.yPos - input.hiboxSize <= CoordY  && input.yPos + input.hiboxSize >= CoordY  ){
                            //we need to know if the types are the same
                            if(input.varType == originalPort.varType){
                                
                               //TODO nomes dinamicos
                                let name = 'connection' + ChartStruc.ModuleList.length
                                let connection = new Connection(name, originalPort, originalPort.isInput, originalModule, module, input);   
                                connection.setConnectedPort(input, module);    
                                
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
                                //inputmodule
                                //InternalPort: Port, ExternalPort: Port, ExternalNode: Module, Connection: Connection)
                                originalModule.addOutputConnection(originalPort, input, module ,connection);
                                
                                //outputmodule
                                //InternalPort: Port, ExternalPort: Port, ExternalNode: Module, Connection: Connection
                                module.addInputConnection(input, originalPort, originalModule ,connection);
    

                                connection.calculateCurve();      
                                ChartStruc.FinalConnections.push(connection);
                                ChartStruc.FinalConnections=ChartStruc.FinalConnections;
                                

                                
                                //History
                                __HistoryChart.addState(ChartStruc.toJSON());
                            }else{
                                
                                dispatch("wrongTypes");
                            }
                        }
                    }
                }
            }else{
                for(let output of module.outputList){
                    if(output.xPos - output.hiboxSize <= CoordX  && output.xPos + output.hiboxSize >= CoordX){
                        if(output.yPos - output.hiboxSize <= CoordY  && output.yPos + output.hiboxSize >= CoordY){
                            //we need to know the port of the module now
                            if(output.varType == originalPort.varType){
                                //TODO nomes dinamicos
                                let name = 'connection' + ChartStruc.ModuleList.length
                                let connection = new Connection(name, originalPort, originalPort.isInput, originalModule, module, output); 

                                connection.setConnectedPort(output, module);

                                //inputmodule
                                //InternalPort: Port, ExternalPort: Port, ExternalNode: Module, Connection: Connection)
                                originalModule.addInputConnection(originalPort, output, module ,connection);
                                
                                //outputmodule
                                //InternalPort: Port, ExternalPort: Port, ExternalNode: Module, Connection: Connection
                                module.addOutputConnection(output, originalPort, originalModule ,connection);
    
                                connection.calculateCurve();     
                                ChartStruc.FinalConnections.push(connection);
                                ChartStruc.FinalConnections=ChartStruc.FinalConnections;
                                dispatch('updateHistory');

                            }else{
                                dispatch("wrongTypes");
                            }
                        }
                    }
                }

            }
            
        }
    }

    //TODO posso nao tar sempre a criar e dar simplesment update as ligacoes
    const handleDragEnd = (e) => {
        
    }
	const handleDragMove = (e) => {
        let moduleDragged;
        moduleDragged = e.detail.Module;
        let dx  = e.detail.dx.dx;
        let dy  = e.detail.dy.dy; 
        let lastX  = e.detail.lastX.lastX;
        let lastY  = e.detail.lastY.lastY;  

        //TODO
        for (let moduleentry of ChartStruc.ModuleList){
            if(moduleentry.id == moduleDragged.StrucModule.id){
                moduleentry.setPortCoords();
                if(moduleentry.connectionsInputs !== undefined){
                    for(let inputconnection of moduleentry.connectionsInputs){
                        inputconnection.Connection.calculateCurve();
                        for(let finalconnection of ChartStruc.FinalConnections){
                            if(finalconnection.id == inputconnection.Connection.id){
                                finalconnection=inputconnection;
                            }
                        }
                    }
                }
                if(moduleentry.connectionsOutputs !== undefined){
                    for(let outputconnection of moduleentry.connectionsOutputs){
                        outputconnection.Connection.calculateCurve();
                        for(let finalconnection of ChartStruc.FinalConnections){
                            if(finalconnection.id == outputconnection.Connection.id){
                                finalconnection=outputconnection;
                            }
                        }
                    }
                }
            }
            ChartStruc.FinalConnections=ChartStruc.FinalConnections;
        }
    }
    
    const Aveiro =new Module(1, "University of Aveiro, Aveiro", 100, 100);
    const AveiroInput0 = new Port(true,"September","2017");
    const AveiroOutput0 = new Port(false,"September","2020");
    const AveiroOutput1 = new Port(false,"Bachelor's Degree","Software Engenieering");
    const AveiroOutput2 = new Port(false,"Experience"," ");
    Aveiro.addInputs([AveiroInput0]);
    Aveiro.addOutputs([AveiroOutput0,AveiroOutput1,AveiroOutput2]);  
    Aveiro.setModuleWidth();
    Aveiro.setModuleHeight();
    Aveiro.setPortCoords();

    const IST =new Module(1, "Instituto Superior Técnico, Lisbon", 900, 100);
    const ISTInput0 = new Port(true,"September","2020");
    const ISTOutput0 = new Port(false,"February","2023");
    const ISTOutput1 = new Port(false,"Master's Degree","Software Engenieering");
    const ISTOutput2 = new Port(false,"Major","Artificial Intelligence");
    const ISTOutput3 = new Port(false,"Major","Game Development");
    const ISTOutput4 = new Port(false,"Minor","Computational Mathematics Applied to Finance");
    const ISTOutput5 = new Port(false,"Experience"," ");
    IST.addInputs([ISTInput0]);
    IST.addOutputs([ISTOutput0,ISTOutput1,ISTOutput2,ISTOutput3,ISTOutput4,ISTOutput5]);  
    IST.setModuleWidth();
    IST.setModuleHeight();
    IST.setPortCoords();

    const NEI =new Module(1, "Núcleo de Estudantes", 500, 400);
    const NEIInput0 = new Port(true,"November","2018");
    const NEIOutput0 = new Port(false,"February","2019");
    const NEIOutput1 = new Port(false,"External","Collaborator");
    NEI.addInputs([NEIInput0]);
    NEI.addOutputs([NEIOutput0,NEIOutput1]);  
    NEI.setModuleWidth();
    NEI.setModuleHeight();
    NEI.setPortCoords();

    const PrimeIT =new Module(1, "Prime IT", 50, 450);
    const PrimeITInput0 = new Port(true,"November","2018");
    const PrimeITOutput0 = new Port(false,"July","2019");
    const PrimeITOutput1 = new Port(false,"Prime College","Ambassador");
    PrimeIT.addInputs([PrimeITInput0]);
    PrimeIT.addOutputs([PrimeITOutput0,PrimeITOutput1]);  
    PrimeIT.setModuleWidth();
    PrimeIT.setModuleHeight();
    PrimeIT.setPortCoords();


    const ESN =new Module(1, "Erasmus Student Network", 200, 700);
    const ESNInput0 = new Port(true,"September","2018");
    const ESNOutput0 = new Port(false,"January","2020");
    ESN.addInputs([ESNInput0]);
    ESN.addOutputs([ESNOutput0]);  
    ESN.setModuleWidth();
    ESN.setModuleHeight();
    ESN.setPortCoords();

    const CSW =new Module(1, "Critical Software", 1100, 500);
    const CSWInput0 = new Port(true,"July","2021");
    const CSWOutput0 = new Port(false,"August","2021");
    const CSWOutput1 = new Port(false,"Summer","Intern");
    CSW.addInputs([CSWInput0]);
    CSW.addOutputs([CSWOutput0,CSWOutput1]);  
    CSW.setModuleWidth();
    CSW.setModuleHeight();
    CSW.setPortCoords();


    ChartStruc.addModule(Aveiro)
    ChartStruc.addModule(IST)
    ChartStruc.addModule(NEI)
    ChartStruc.addModule(PrimeIT)
    ChartStruc.addModule(ESN)
    ChartStruc.addModule(CSW)
    



    let connection = new Connection("1", ISTInput0, ISTInput0.isInput, IST); 
    connection.setConnectedPort(AveiroOutput0, Aveiro);
    //inputmodule
    //InternalPort: Port, ExternalPort: Port, ExternalNode: Module, Connection: Connection)
    IST.addInputConnection(ISTInput0, AveiroOutput0, Aveiro ,connection);
    //outputmodule
    //InternalPort: Port, ExternalPort: Port, ExternalNode: Module, Connection: Connection
    Aveiro.addOutputConnection(AveiroOutput0, ISTInput0, IST ,connection);

    connection.calculateCurve();     
    ChartStruc.FinalConnections.push(connection);

    ////////////////////////////

    connection = new Connection("2", NEIInput0, NEIInput0.isInput, NEI); 
    connection.setConnectedPort(AveiroOutput2, Aveiro);
    NEI.addInputConnection(NEIInput0, AveiroOutput2, Aveiro ,connection);
    Aveiro.addOutputConnection(AveiroOutput2, NEIInput0, NEI ,connection);
    connection.calculateCurve();     
    ChartStruc.FinalConnections.push(connection);

    ////////////////////////////


    connection = new Connection("4", PrimeITInput0, PrimeITInput0.isInput, PrimeIT); 
    connection.setConnectedPort(AveiroOutput2, Aveiro);
    PrimeIT.addInputConnection(PrimeITInput0, AveiroInput0, Aveiro ,connection);
    Aveiro.addOutputConnection(AveiroOutput2, AveiroOutput2, PrimeIT ,connection);
    connection.calculateCurve();     
    ChartStruc.FinalConnections.push(connection);

    ////////////////////////////


    connection = new Connection("6", ESNInput0, ESNInput0.isInput, ESN); 
    connection.setConnectedPort(AveiroOutput2, Aveiro);
    ESN.addInputConnection(ESNInput0, AveiroOutput2, Aveiro ,connection);
    Aveiro.addOutputConnection(AveiroOutput2, ESNInput0, ESN ,connection);
    connection.calculateCurve();     
    ChartStruc.FinalConnections.push(connection);

    ////////////////////////////


    connection = new Connection("8", CSWOutput0, CSWOutput0.isInput, CSW); 
    connection.setConnectedPort(ISTOutput5, IST);
    CSW.addInputConnection(CSWOutput0, ISTOutput5, IST ,connection);
    IST.addOutputConnection(ISTOutput5, CSWOutput0, CSW ,connection);
    connection.calculateCurve();     
    ChartStruc.FinalConnections.push(connection);



    connection.calculateCurve();     
    ChartStruc.FinalConnections.push(connection);



    ChartStruc.FinalConnections=ChartStruc.FinalConnections;

</script>
    
    <svg
    >
<g>      
    <MyModule
    StrucModule={Aveiro} 
    headerColor={'rgb(146, 212, 0)'}
    on:handleDragEnd={handleDragEnd}
    on:handleDragMove={handleDragMove}
    /> 
    <MyModule
    StrucModule={IST} 
    headerColor={'rgb(0, 157, 224)'}
    on:handleDragEnd={handleDragEnd}
    on:handleDragMove={handleDragMove}
    /> 
    <MyModule
    StrucModule={NEI} 
    headerColor={'rgb(13,135,62)'}
    on:handleDragEnd={handleDragEnd}
    on:handleDragMove={handleDragMove}
    /> 
    <MyModule
    StrucModule={PrimeIT} 
    headerColor={'rgb(84,229,13)'}
    on:handleDragEnd={handleDragEnd}
    on:handleDragMove={handleDragMove}
    /> 
    <MyModule
    StrucModule={ESN} 
    headerColor={'rgb(46,49,146)'}
    on:handleDragEnd={handleDragEnd}
    on:handleDragMove={handleDragMove}
    /> 
    <MyModule
    StrucModule={CSW} 
    headerColor={'rgb(192,23,34)'}
    on:handleDragEnd={handleDragEnd}
    on:handleDragMove={handleDragMove}
    /> 
    
    {#each ChartStruc.FinalConnections as connection,i (i)}
        <ConnectionSVG 
            connection={connection}
            />
    {/each}
        
</g>
</svg>

<style>
    svg{
        background-color:#b3b3b3;
        width: 100%; 
        height: 100%;
    }
    path{
        stroke-width: 5;
        stroke-opacity: 0.5;
        stroke:rgb(0, 0, 0);

    }
	circle { fill: rgb(255, 255, 255); opacity:1;z-index: 1 }
	circle:hover { fill: rgb(255, 255, 255); opacity:1;z-index: 1}
</style>