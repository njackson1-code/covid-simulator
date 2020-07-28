import Plot from './plot.js';
import React from 'react';


class Create extends React.Component{
    constructor(props){
        super(props)
        this.state = ({numOfCreations: 0});
        this.numOfCreations = 0;
        this.assigned = false;
        this.clicked = false;
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
        
        if (event.target.id == 'ResetSimulation'){
            this.reset();
            
            return;
        }

        if (event.target.id != 'GenerateSimulation' || this.clicked){
            return;
        }
        this.clicked = true;


        this.masks = document.getElementById("masks").checked;
       
        if (this.masks){
           
            this.masks = true;
        }
        else {
            this.masks = false;
        }


        this.numPeople = document.getElementById('numPeople').value;
     
        if (isNaN(this.numPeople)){
            alert("Please enter number of people for simulation");
            return;
        }
        this.assigned = true;
        this.numOfCreations ++;
        this.setState({numOfCreations: this.numOfCreations});
    }

    reset(){
        this.clicked = false;
        this.assigned = false;
        document.getElementById("overshadow").style.display = 'none';
        this.setState({numOfCreations: this.numOfCreations});
    }

    callbackFunction = (childData) => {
        this.numOfCreations = this.numOfCreations + 1;
    }


    render(){
        if (!this.assigned){
            return <div id = "graphArea"></div>;
        }
       

        return (
        <div id = "graphArea">
          <Plot callbackFunction = {this.callbackFunction} id = {this.numOfCreations} key = {this.numOfCreations} numOfNodes = {this.numPeople} masks = {this.masks} />
        </div>
        )
    }

}

export default Create;