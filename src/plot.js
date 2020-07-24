import React from 'react';
import Person from './person.js';
import Transmit from './transmit.js';
import { tsThisType } from '@babel/types';

class Plot extends React.Component {
    constructor(props) {
        super(props);
        //initial values
        this.justReset = false;
        this.numOfNodes = props.numOfNodes;
        this.nodes = []
        this.passNodes = []

        
        
        //dict for information being sent back
        this.allNodes = {}
        this.reset = false;
        this.change = false;
        this.taco = 0;

        if (props.masks){
            this.infectionRate = 100;
        } else {
            this.infectionRate = 25;
        }

        this.social = document.getElementById("sd").value/100;
        //
        this.arrivedNodes = 0;

        //meeting locations
        this.numOfMeetings = this.numOfNodes / 4;
        this.meetings = [];
        for (let i = 0; i < this.numOfMeetings; i ++){
            
            let x = Math.floor(1+Math.random() * 98);
            let y = Math.floor(2+Math.random() * 96);
            this.meetings[i] = {}
            this.meetings[i].x = x;
            this.meetings[i].y = y;
        }

        this.done = false;

        //stores the meeting spot for each specified node
        this.nodeMeeting = {}
        this.interactionDuration = {}
        for (let i = 0; i < this.numOfNodes; i ++){
            let check = Math.random();
            let idNum = 'a' + i;
            this.nodes[i] =  idNum;
            this.passNodes[i] = idNum;
            let num = Math.floor(Math.random() * this.numOfMeetings);
            
                this.nodeMeeting[idNum] = this.meetings[num];
                this.nodeMeeting[idNum].x += (1 * Math.random() - 0.5)
                this.nodeMeeting[idNum].y += (1 * Math.random() - 0.5)
                
            
            

            this.allNodes[idNum] = {};
            this.interactionDuration = {};
            this.allNodes[idNum].infected = false;
        }


        //converting to component list with keys
        this.nodes = this.nodes.map((item)=> {
            
            return (
                <Person  masks = {props.masks} infected = {false} social = {this.social} recovered = {false} reset = {false} id={item} meeting={this.nodeMeeting[item]} parentCallback = {this.callbackFunction} key={item}/>
            )
        })
        
        //infecting one of them
        this.nodes[0] = <Person masks = {props.masks} infected = {true} social = {this.social} id={'a0'} recovered = {false} reset = {false} meeting={this.nodeMeeting['a0']} parentCallback = {this.callbackFunction} key={'a0'}/>
        this.state = {nodes: this.nodes};


        //transmission graphics
        this.transmissions = [];
    }

    componentDidMount() {
        //this.updatePosition();
        
        this.timerID = setInterval(
          () => this.update(),
          50
        );
        
    }

    
    //function for checking if state of people need to be updated
    update(){
        //should update is set to false
        this.shouldUpdate = false;
        this.done = false;

        //if everything had just been reset, want to update
        if (this.justReset){
            this.shouldUpdate = true;
            this.justReset = false;
        }

        //checks for infections
        this.checkCollision();
       
        //checks if every node has made it to meetings
        //this.updateMeetings();
        //if so, it changes meeting spots and makes the nodes move again
        if (this.reset){
            this.RESET();
            this.shouldUpdate = true;
        }

        //sets state to render everything
        //updates Components then renders them
        if (this.shouldUpdate){
            this.updateComponents();
            this.setState({nodes: this.nodes});
            if (this.reset){
                this.reset = false;
                this.justReset = true;
            }
            
        }
        
    }


    //updates Components with most recent data of all people
    updateComponents(){
        for (let i = 0; i < this.numOfNodes; i ++){
            let iid = 'a' + i;
            this.nodes[i] = <Person infected = {this.allNodes[iid].infected} recovered = {this.allNodes[iid].recovered} reset = {this.reset} id={iid} meeting={this.nodeMeeting[iid]} parentCallback = {this.callbackFunction} key={iid}/>
        }
        this.shouldUpdate = false;
    }

    hardcode(){
        this.reset = false;
    }


    //distance between two people
    distance(x,y){
        return Math.sqrt(Math.pow(this.allNodes[x].x - this.allNodes[y].x,2) + Math.pow(this.allNodes[x].y - this.allNodes[y].y, 2));
    }
    

    //funciton to return data from people
    callbackFunction = (childData) => {
        //if id of person already stored, but newly arrived, increment
        if (childData.id in this.allNodes){
            if (!this.allNodes[childData.id].arrived && childData.arrived){
                this.arrivedNodes = this.arrivedNodes + 1;
            }
        }
        //else if not saved data but the person has arrived, increment
        else if (childData.arrived){
          
            this.arrivedNodes = this.arrivedNodes + 1;
        }

        //saved most recent data
        this.allNodes[childData.id] = childData;


        //if all arrived, must reset
        if (this.arrivedNodes == (this.numOfNodes)){
            this.reset = true;
            this.arrivedNodes = 0;
            this.shouldUpdate = true;
            alert("all arrived")
        }

        this.allSick = false;
        
    };
    
    checkCollision(){
        let sum = 0;
       
        for (let i = 0; i < this.nodes.length; i ++){
            for (let j = 0; j < this.nodes.length; j ++){
                let iid = this.passNodes[i];
                let jid = this.passNodes[j];
                
                if (this.allNodes[iid].recovered || this.allNodes[jid].recovered || i == j || (this.allNodes[iid].infected && this.allNodes[jid].infected)){
                    continue;
                }

                if (!this.allNodes[iid].infected && !this.allNodes[jid].infected){
                    continue;
                }

                let healthyid = iid;
                if (!this.allNodes[jid].infected){
                    healthyid = jid;
                }
                
                if (iid == 'a1'){
                   //console.log(this.allNodes[iid].x);
                }
                if (this.distance(iid,jid) < 2.5){
                    
                    this.interactionDuration[healthyid] += 1;
                    let check = Math.random();
                    if (check < (this.interactionDuration[healthyid]/this.infectionRate)){
                        console.log("sick")
                        this.allNodes[healthyid].infected = true;
                            //this.allNodes[jid].infected = true;
                            this.shouldUpdate = true;

                        let ind = this.transmissions.length;
                        this.transmissions.push(<Transmit key = {"tm" + healthyid} id = {"tm" + healthyid} x={this.allNodes[healthyid].x} y={this.allNodes[healthyid].y}/>);
                        setTimeout(() => {
                            delete this.transmissions[ind];
                            this.setState({nodes: this.nodes});
                            console.log("Fade");
                        }, 1500);
                    }
                } 
                else {
                    this.interactionDuration[healthyid] = 0;
                }
                
                /* if (i != j){
                    if ((this.allNodes[iid].infected || this.allNodes[jid].infected) && !(this.allNodes[iid].infected && this.allNodes[jid].infected)){
                        let check = Math.random();
                        
                        if (check < this.infectionRate && this.distance(iid,jid) < 2.5){
                            //if it makes one sick, it want to update it
                            this.allNodes[iid].infected = true;
                            this.allNodes[jid].infected = true;
                            this.shouldUpdate = true;
                        }
                    }
                    
                } */
            }
            if (this.allNodes[this.passNodes[i]].infected) {
                sum = sum + 1;
            }
        }

        if (sum == this.numOfNodes){
            this.allSick = true;
        }
        
    }

    updateMeetings(){
        for (let i = 0; i < this.nodes.length; i ++){
            let iid = this.passNodes[i];
            if (!this.allNodes[iid].arrived){
                
                for (let j = 0; j < this.nodes.length; j ++){
                    let jid = this.passNodes[j];
                    
                    //this.nodes[j] = <Person infected = {false} reset = {false} id={jid} meeting={this.nodeMeeting[jid]} parentCallback = {this.callbackFunction} key={jid}/>
                }
                return;
            }
        }

        for (let i = 0; i < this.numOfMeetings; i ++){
            let x = Math.floor(1+Math.random() * 98);
            let y = Math.floor(2+Math.random() * 96);
            this.meetings[i] = {}
            this.meetings[i].x = x;
            this.meetings[i].y = y;
        }

       
            for (let i = 0; i < this.nodes.length; i ++){
                let iid = this.passNodes[i];
                this.allNodes[iid].arrived = false;
            }
         

        this.reset = true;
    }

    RESET() {
        this.nodeMeeting = {}
        //this.nodes = []
        
        for (let i = 0; i < this.numOfMeetings; i ++){
            let x = Math.floor(1+Math.random() * 98);
            let y = Math.floor(1+Math.random() * 98);
            this.meetings[i] = {}
            this.meetings[i].x = x;
            this.meetings[i].y = y;
        }


        for (let i = 0; i < this.numOfNodes; i ++){
            let idNum = 'a' + i;
            this.passNodes[i] = idNum;
            let num = Math.floor(Math.random() * this.numOfMeetings);
            this.nodeMeeting[idNum] = this.meetings[num];
            
            
            
            
            
            
           
            //this.nodes[i] = <Person infected = {this.allNodes[iid].infected} reset = {true} id={iid} meeting={this.nodeMeeting[iid]} parentCallback = {this.callbackFunction} key={iid}/>                        

            
            
            //this.setState({nodes: this.nodes});
        }
        console.log(this.nodeMeeting)
        
        //this.setState({nodes: this.nodes});
        
        

        
        

        
    }


    render (){
        //this.nodeMeeting = {}
        
        let pp;
        
        if (this.taco >= 2 && !this.reset) {
            for (let i = 0; i < this.numOfNodes; i ++){
                let idNum = 'a' + i;
                let check = Math.random();
                
                //this.nodes[i] = <Person infected = {this.allNodes[idNum].infected} reset = {false} id={idNum} key={idNum} parentCallback = {this.callbackFunction}/>

              
              

                
                
            }
        }
        this.taco = this.taco + 1;  
        
        if (this.change){
            this.change = false;
            
            for (let i = 0; i < this.numOfNodes; i ++){
                let idNum = 'a' + i;
                //this.nodes[i] = <Person infected = {this.allNodes[idNum].infected} reset = {false} id={idNum} key={idNum} parentCallback = {this.callbackFunction}/>
            }
        } 
        
        if (this.reset){
            
            this.change = true;
        }

       
        console.log(this.state.nodes)
        console.log(this.transmissions)
        if (this.allSick){
            return (<div>
                All Sick
            </div>)
        }
        return ( 
            <div>
                <div>{this.state.nodes}</div>
                
                <div>{this.transmissions}</div>
            </div>
           
        )
    }
}

export default Plot;