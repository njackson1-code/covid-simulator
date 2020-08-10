import Plot from './plot.js';
import React from 'react';
import Meter from './meter.js';


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
            document.getElementById("masks").style.backgroundColor = "white";
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
                   
                    <div id = "graphArea"></div>
            </>);
        }
       
        
        return (
        <>  
            <Meter negativeNumbers = {this.negativeNumbers} positiveNumbers = {this.positiveNumbers} recoveredNumbers = {this.recoveredNumbers} deceasedNumbers = {this.deceasedNumbers}/>
            
        <div id = "graphArea">
          <Plot allSick = {this.allSick} callbackFunction = {this.callbackFunction} id = {this.numOfCreations} key = {this.numOfCreations} numOfNodes = {this.numPeople} masks = {this.masks} />
        </div>
        </>
        )
    }

}

export default Create;