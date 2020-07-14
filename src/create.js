import Plot from './plot.js';
import React from 'react';


class Create extends React.Component{
    constructor(props){
        super(props)
        this.state = ({numOfCreations: 0});
        this.numOfCreations = 0;
        this.assigned = false;
        
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
        
        if (event.target.id != 'GenerateSimulation'){
            return;
        }

        this.masks = document.getElementById("masks").checked;
        alert(this.masks)
        if (this.masks){
           
            this.masks = true;
        }
        else {
            this.masks = false;
        }


        this.numPeople = document.getElementById('numPeople').value;
        console.log(this.numPeople )
        console.log(Number.isInteger(this.numPeople))
        if (isNaN(this.numPeople)){
            alert("Please enter number of people for simulation");
            return;
        }
        this.assigned = true;
        this.numOfCreations ++;
        this.setState({numOfCreations: this.numOfCreations});
    }


    render(){
        if (!this.assigned){
            return <div id = "graphArea"></div>;
        }
        console.log(this.numPeople)

        return (
        <div id = "graphArea">
          <Plot key = {this.numOfCreations} numOfNodes = {this.numPeople} masks = {this.masks} />
        </div>
        )
    }

}

export default Create;