import React from 'react';
import Person from './person.js';
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
            this.infectionRate = 0.03;
        } else {
            this.infectionRate = 0.3;
        }

        this.social = document.getElementById("sd").value/100;
        //
        this.arrivedNodes = 0;

        //meeting locations
        this.numOfMeetings = this.numOfNodes / 4;
        this.meetings = [];
        for (let i = 0; i < this.numOfMeetings; i ++){
            
            let x = Math.floor(1+Math.random() * 98);
            let y = Math.floor(1+Math.random() * 98);
            this.meetings[i] = {}
            this.meetings[i].x = x;
            this.meetings[i].y = y;
        }

        this.done = false;

        //stores the meeting spot for each specified node
        this.nodeMeeting = {}
        for (let i = 0; i < this.numOfNodes; i ++){
            let check = Math.random();
            let idNum = 'a' + i;
            this.nodes[i] =  idNum;
            this.passNodes[i] = idNum;
            let num = Math.floor(Math.random() * this.numOfMeetings);
            
                this.nodeMeeting[idNum] = this.meetings[num];
                
            
            

            this.allNodes[idNum] = {}
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
    }

    componentDidMount() {
        //this.updatePosition();
        
        this.timerID = setInterval(
          () => this.update(),
          50
        );
        
    }

    

    update(){
        this.shouldUpdate = false;
        this.done = false;

        if (this.justReset){
            this.shouldUpdate = true;
            this.justReset = false;
        }
        //checks for infecgting
        this.checkCollision();
        //checks if every node has made it to meetings
        //this.updateMeetings();
        //if so, it changes meeting spots and makes the nodes move again
        if (this.reset){
            
            let pp = this.RESET();
            this.shouldUpdate = true;
            
        }
        //sets state to render everything
        
        if (this.shouldUpdate){
            this.updateComponents();
            this.setState({nodes: this.nodes});
            if (this.reset){
                this.reset = false;
                this.justReset = true;
            }
            
        }
        
    }



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

    distance(x,y){
        
        return Math.sqrt(Math.pow(this.allNodes[x].x - this.allNodes[y].x,2) + Math.pow(this.allNodes[x].y - this.allNodes[y].y, 2));
    }
    
    callbackFunction = (childData) => {
        if (childData.id in this.allNodes){
            if (!this.allNodes[childData.id].arrived && childData.arrived){console.log("anto")
                this.arrivedNodes = this.arrivedNodes + 1;
            }
        }
        else if (childData.infected){
            console.log("anto")
            this.arrivedNodes = this.arrivedNodes + 1;
        }
        this.allNodes[childData.id] = childData;

        if (this.arrivedNodes == (this.numOfNodes)){
            console.log("all aboard")
            this.reset = true;
            this.arrivedNodes = 0;
            this.shouldUpdate = true;
        }

        this.allSick = false;
        
    };
    
    checkCollision(){
        let sum = 0;
       
        for (let i = 0; i < this.nodes.length; i ++){
            for (let j = 0; j < this.nodes.length; j ++){
                let iid = this.passNodes[i];
                let jid = this.passNodes[j];
                
                if (this.allNodes[iid].recovered || this.allNodes[jid].recovered){
                    continue;
                }
                
                if (i != j){
                    if ((this.allNodes[iid].infected || this.allNodes[jid].infected) && !(this.allNodes[iid].infected && this.allNodes[jid].infected)){
                        let check = Math.random();
                        
                        if (check < this.infectionRate && this.distance(iid,jid) < 1){
                            console.log("aqui")
                            this.allNodes[iid].infected = true;
                            this.allNodes[jid].infected = true;
                            this.shouldUpdate = true;
                            //console.log(JSON.stringify(this.nodes[i]))
                            
                            //n//odes[i].infect();
                            //nodes[j].infect();
                        }
                    }
                    
                }
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
            let y = Math.floor(1+Math.random() * 98);
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
            let iid = this.passNodes[i];   
            
            
            
           
            //this.nodes[i] = <Person infected = {this.allNodes[iid].infected} reset = {true} id={iid} meeting={this.nodeMeeting[iid]} parentCallback = {this.callbackFunction} key={iid}/>                        

            
            
            //this.setState({nodes: this.nodes});
        }
        
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

       
        //console.log(this.state.nodes)
        //console.log(this.nodes)
        if (this.allSick){
            return (<div>
                All Sick
            </div>)
        }
        return ( 
            <div>
                {this.state.nodes}
            </div>
           
        )
    }
}

export default Plot;