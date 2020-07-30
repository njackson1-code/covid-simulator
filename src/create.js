import Plot from './plot.js';
import React from 'react';


class Create extends React.Component{
    constructor(props){
        super(props)
        this.state = ({numOfCreations: 0});
        this.numOfCreations = 0;
        this.assigned = false;
        this.clicked = false;
        this.masks = false;
        //this.numPeople = document.getElementById('numPeople').value;
    }

    componentDidMount() {
        
        this.assigned = false;
        let btn = document.getElementById("GenerateSimulation");
        //this.numPeople = document.getElementById('numPeople').value;
        let self = this;
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
        this.allSick = true;
        this.setState({numOfCreations: this.numOfCreations});
    }

    callbackFunction = (childData) => {
        this.numOfCreations = this.numOfCreations + 1;
    }


    render(){
        if (this.allSick){
            console.log("should cancel all")    
        }

        if (!this.assigned){
            
            return <div id = "graphArea"></div>;
        }
       
        console.log(this.masks)
        return (
            
        <div id = "graphArea">
          <Plot allSick = {this.allSick} callbackFunction = {this.callbackFunction} id = {this.numOfCreations} key = {this.numOfCreations} numOfNodes = {this.numPeople} masks = {this.masks} />
        </div>
        )
    }

}

export default Create;