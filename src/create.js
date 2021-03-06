import Plot from './plot.js';
import React from 'react';
import Meter from './meter.js';
import Arrow from './back.png';


class Create extends React.Component{
    constructor(props){
        super(props)
        this.state = ({numOfCreations: 0, height: 90});
        this.numOfCreations = 0;
        this.assigned = false;
        this.clicked = false;
        this.masks = false;

        this.positiveNumbers = 0;
        this.negativeNumbers = 0;
        this.recoveredNumbers = 0;
        this.deceasedNumbers = 0;
        //this.numPeople = document.getElementById('numPeople').value;
    }

    componentDidMount() {
        
        this.assigned = false;
        let btn = document.getElementById("GenerateSimulation");
        //this.numPeople = document.getElementById('numPeople').value;
        let self = this;
        let offset = 
        //document.getElementById("masks").style.height = document.getElementById("masks").clientWidth + "px";
        //document.getElementById("homeBorder").height = 
        document.addEventListener('click', this.generate);
        
       
        //btn.onClick = this.generate();
    }

    generate = event =>{
        if (event.target.id == 'masks'){
            this.maskSet();
            return;
        }
        if (event.target.id == 'ResetSimulation'){
            this.reset();
            
            return;
        }

        if (event.target.id != 'GenerateSimulation' || this.clicked){
            return;
        }
        
        this.allSick = false;
        this.clicked = true;


        


        this.numPeople = document.getElementById('numPeople').value;
     
        if (isNaN(this.numPeople)){
            alert("Please enter number of people for simulation");
            return;
        }
        this.assigned = true;
        this.numOfCreations ++;
        this.setState({numOfCreations: this.numOfCreations});
    }

    maskSet(){
        if (this.masks){
            document.getElementById("masks").style.backgroundColor = "lightgray";
        }
        else {
            document.getElementById("masks").style.backgroundColor = "blue";
        }
        this.masks = !this.masks;
        
    }
    reset(){
        this.clicked = false;
        this.assigned = false;
       
        document.getElementById("overshadow").style.display = 'none';
        
        console.log(document.getElementById("positiveMeter").style.height)
        
        this.allSick = true;
        this.numOfCreations = this.numOfCreations + 1;

        let childData = {};
        childData.negativeNumbers = 0;
        childData.positiveNumbers = 0;
        childData.recoveredNumbers = 0;
        childData.deceasedNumbers = 0;
        this.callbackFunction(childData)
        this.setState({numOfCreations: this.numOfCreations});
    }

    callbackFunction = (childData) => {
        //this.numOfCreations = this.numOfCreations + 1;
       
        this.negativeNumbers = childData.negativeNumbers;
        this.positiveNumbers = childData.positiveNumbers;
        this.recoveredNumbers = childData.recoveredNumbers;
        this.deceasedNumbers = childData.deceasedNumbers;
        console.log(this.deceasedNumbers)
        this.setState({numOfCreations: this.numOfCreations});
    }


    render(){
       
        
        if (!this.assigned){
            
            return (<>
                    <Meter allSick = {this.allSick} negativeNumbers = {this.negativeNumbers} positiveNumbers = {this.positiveNumbers} recoveredNumbers = {this.recoveredNumbers} deceasedNumbers = {this.deceasedNumbers}/>

                    <div id = "graphBox">
                        <div id = "graphArea"></div>
                        <div id = "homeBorder">HOME (SOCIALLY DISTANCED)</div>
                    </div>

                    <div id ="infoWrapper">
                    <img id = {"pointer"} src = {Arrow}></img>
                    <div id = "information">
                        
                        <div id = "beforeHover">
                            <div id = "infoStart">I</div>
                            <div>N</div>
                            <div>F</div>
                            <div>O</div>
                        </div>

                        <div id = "duringHover">
                        <ul>Inputs</ul>
                        The header is to be used to add inputs to the simulation. It only has three inputs in order to make the simulation easy to use.

                        <ul>Simulation details</ul>
                        When the simulation is generated, it will simulate people moving within their community. When someone is in the bottom border labeled "Home", they cannot transmit the disease.
                        Also, upon generation, a bar will appear on the left side of the screen which shows the number of people in each state (no covid, currently has covid, recovered, or deceased). 
                        The simulation will stop when the disease can no longer be spread. That could mean herd immunity, or it could mean social distancing was effective in stoping the spread.






                        </div>
                    </div>
                    </div>
       
            </>);
        }
       
        
        return (
        <>  
            <Meter negativeNumbers = {this.negativeNumbers} positiveNumbers = {this.positiveNumbers} recoveredNumbers = {this.recoveredNumbers} deceasedNumbers = {this.deceasedNumbers}/>
        
        <div id = "graphBox">
        <div id = "graphArea">
          <Plot allSick = {this.allSick} callbackFunction = {this.callbackFunction} id = {this.numOfCreations} key = {this.numOfCreations} numOfNodes = {this.numPeople} masks = {this.masks} />
        </div>
        <div id = "homeBorder">HOME (SOCIALLY DISTANCED)</div>
        </div>

        <div id ="infoWrapper">
        <img id = {"pointer"} src = {Arrow}></img>
        <div id = "information">
                        
                        <div id = "beforeHover">
                            <div id = "infoStart">I</div>
                            <div>N</div>
                            <div>F</div>
                            <div>O</div>
                        </div>

                        <div id = "duringHover">
                        <ul>Inputs</ul>
                        The header is to be used to add inputs to the simulation. It only has three inputs in order to make the simulation easy to use.

                        <ul>Simulation details</ul>
                        When the simulation is generated, it will simulate people moving within their community. When someone is in the bottom border labeled "Home", they cannot transmit the disease.
                        Also, upon generation, a bar will appear on the left side of the screen which shows the number of people in each state (no covid, currently has covid, recovered, or deceased). 
                        The simulation will stop when the disease can no longer be spread. That could mean herd immunity, or it could mean social distancing was effective in stoping the spread.






                        </div>
                    </div>
                    </div>

        </>

        )
    }

}

export default Create;