import React from 'react';
import Person from './person.js';
import Transmit from './transmit.js';
import Meeting from './meeting.js';
import { tsThisType } from '@babel/types';

class Plot extends React.Component {
    constructor(props) {
        super(props);
        //initial values
        this.justReset = false;
        this.numOfNodes = props.numOfNodes;
        this.nodes = []
        this.passNodes = []
        this.key = props.id;

        
        
        //dict for information being sent back
        this.allNodes = {}
        this.reset = false;
        this.change = false;
        this.taco = 0;

        if (props.masks){
            this.infectionRate = 200;
        } else {
            this.infectionRate = 75;
        }

        this.social = document.getElementById("sd").value/100;
        //
        this.arrivedNodes = 0;

        //meeting locations
        this.renderMeetings = [];
        this.numOfMeetings = this.numOfNodes / 4;
        this.meetings = [];

        let meetingz = this.spaceMeetings(this.numOfMeetings);
        

        for (let i = 0; i < this.numOfMeetings; i ++){
            
            let x = Math.floor(1+Math.random() * 98);
            let y = Math.floor(2+Math.random() * 96);
            this.meetings[i] = {}
            this.meetings[i].x = x;
            this.meetings[i].y = y;

            this.meetings[i] = meetingz[i];
            

            let key = "m" + i;
            let type = 0;
            if (x > 50){
                type = 1;
            }

            this.meetings[i].type = type;

            this.renderMeetings.push(<Meeting x={this.meetings[i].x} y = {this.meetings[i].y} key = {key} id = {key} type = {type}/>)
        }
        

        this.done = false;

        //stores the meeting spot for each specified node
        this.nodeMeeting = {}
        this.interactionDuration = {}

        this.sickList = [];
        this.healthyList = [];

        for (let i = 0; i < this.numOfNodes; i ++){
            let check = Math.random();
            let idNum = this.key + 'a' + i;
            this.nodes[i] =  idNum;
            this.passNodes[i] = idNum;
            
            let num = Math.floor(Math.random() * this.numOfMeetings);
            
            this.nodeMeeting[idNum] = this.meetings[num];
            this.nodeMeeting[idNum].x += (1 * Math.random() - 0.5)
            this.nodeMeeting[idNum].y += (1 * Math.random() - 0.5)
                
            
            

            this.allNodes[idNum] = {};
            this.interactionDuration = {};
            this.allNodes[idNum].infected = false;

            if (i > 0){
                this.healthyList.push(idNum);
            }
            
        }
        this.sickList.push(this.key + 'a0');


        //converting to component list with keys
        this.nodes = this.nodes.map((item)=> {
            let x = 40 + Math.random()*20
            return (
                <Person  homeX = {x} homeY = {110} allSick = {false} masks = {props.masks} infected = {false} social = {this.social} recovered = {false} reset = {false} id={item} meeting={this.nodeMeeting[item]} parentCallback = {this.callbackFunction} key={item}/>
            )
        })
       
        
        //infecting one of them
        this.nodes[0] = <Person homeX = {55} homeY = {110}  allSick = {false} masks = {props.masks} infected = {true} social = {this.social} id={this.key + 'a0'} recovered = {false} reset = {false} meeting={this.nodeMeeting[this.key + 'a0']} parentCallback = {this.callbackFunction} key={this.key + 'a0'}/>
        this.state = {nodes: this.nodes};
       

        //transmission graphics
        this.transmissions = [];
    }

    spaceMeetings(num){
        let block = Math.ceil(Math.sqrt(num));
        let distance = 100/block;
        let meeting = [];
        

        let count = 0;
        for (let i = 0; i < block; i ++){
            for (let j = 0; j < block; j ++){
                if (count > num){
                    return meeting;
                }
                let x = (j * distance) + 5 + Math.floor(Math.random() * distance/2);
                let y = (i * distance) + 5  + Math.floor(Math.random() * distance/2);
                meeting[count] = {};
                meeting[count].x = x;
                meeting[count].y = y;
                count ++;
            }
        }
        return meeting;
    }

    componentDidMount() {
        //this.updatePosition();
        
        this.timerID = setInterval(
          () => this.update(),
          50
        );
        this.setPing();
        
    }
    componentDidUpdate(prevProps) {
        this.allSick = this.props.allSick;
        if (this.key != this.props.id){
            this.setPing();
        }
       
        
    }

    //need algorithm for spacing meeting locations

    componentWillUnmount(){
        this.cancelPing();
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
            let iid = this.key + 'a' + i;
            this.nodes[i] = <Person allSick = {this.allSick} infected = {this.allNodes[iid].infected} recovered = {this.allNodes[iid].recovered} reset = {this.reset} id={iid} meeting={this.nodeMeeting[iid]} parentCallback = {this.callbackFunction} key={iid}/>
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

    homeDistance(x){
        return Math.sqrt(Math.pow(this.allNodes[x].x - 49,2) + Math.pow(this.allNodes[x].y - 102, 2));
    }

    cancelPing(){
        clearTimeout(this.pingTimer);
    }

    setPing(){
        this.pingTimer = setTimeout(
            () => this.ping(),
            10000
          );
    }

    resetPing(){
        clearTimeout(this.pingTimer);
        this.pingTimer = setTimeout(
            () => this.ping(),
            10000
        );
    }

    ping(){
        this.reset = true;
        this.arrivedNodes = 0;
        this.resetPing();
    }


    

    //funciton to return data from people
    callbackFunction = (childData) => {
        //if id of person already stored, but newly arrived, increment
       // if (childData.id in this.allNodes && childData.arrived){
            //if (!this.allNodes[childData.id].arrived && childData.arrived){
         //       this.arrivedNodes = this.arrivedNodes + 1;
            //}
        //}
        //else if not saved data but the person has arrived, increment
        //else if (childData.arrived){
          
          //  this.arrivedNodes = this.arrivedNodes + 1;
       // }
        
        if ('percent' in childData){
            
            this.arrivedNodes = this.arrivedNodes + 1;
        }
        
        //saved most recent data
        this.allNodes[childData.id] = childData;
        let element = document.getElementById("title");
        element.innerHTML = this.arrivedNodes;
        
        //if all arrived, must reset
        if (this.arrivedNodes == (this.numOfNodes)){
            this.resetPing();
            this.reset = true;
            this.arrivedNodes = 0;
            this.shouldUpdate = true;
           
        }

        this.allSick = false;
        
    };
    
    checkCollision(){
        let sum = 0; let untouched = 0; let recov = 0;
        
        


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
                let sickid = jid;
                if (!this.allNodes[jid].infected){
                    healthyid = jid;
                    sickid = iid;
                }

                //if (this.allNodes[sickid].home){
                  //  continue;
                //}

                
                
                if (this.homeDistance(sickid) < 15){
                    continue;
                }
                
                
              
                
                if (this.distance(iid,jid) < 2.5){
                    
                    this.interactionDuration[healthyid] += 1;
                    let check = Math.random();
                    let locationTransmission = 1/2;
                    if (this.nodeMeeting[healthyid].type == 0){
                        locationTransmission = 200;
                    }
                    if (check < ((this.interactionDuration[healthyid]/this.infectionRate)/locationTransmission)){
                        
                        this.allNodes[healthyid].infected = true;
                            //this.allNodes[jid].infected = true;
                            this.shouldUpdate = true;

                        let ind = this.transmissions.length;
                        this.transmissions.push(<Transmit key = {"tm" + healthyid} id = {"tm" + healthyid} x={this.allNodes[healthyid].x} y={this.allNodes[healthyid].y}/>);
                        setTimeout(() => {
                            delete this.transmissions[ind];
                            this.setState({nodes: this.nodes});
                            
                        }, 1500);
                    }
                } 
                else {
                    this.interactionDuration[healthyid] = 0;
                }
                
                 
            }
            if (!this.allNodes[this.passNodes[i]].infected && !this.allNodes[this.passNodes[i]].recovered){
                untouched = untouched + 1;
            }
            if (this.allNodes[this.passNodes[i]].infected && !this.allNodes[this.passNodes[i]].recovered) {
                sum = sum + 1;
            }
            if (this.allNodes[this.passNodes[i]].recovered){
                recov = recov + 1;
            }
        }

        if (sum == this.numOfNodes || untouched == 0 || (untouched + recov == this.numOfNodes)){
            this.allSick = true;
            this.message = "Immunity Reached. No one else to spread disease to."
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

        this.renderMeetings = [];
        for (let i = 0; i < this.numOfMeetings; i ++){
            let x = Math.floor(1+Math.random() * 98);
            let y = Math.floor(2+Math.random() * 96);
            this.meetings[i] = {}
            this.meetings[i].x = x;
            this.meetings[i].y = y;

            let key = "m" + x;
            let type = 0;
            if (x > 50){
                type = 1;
            }

            this.meetings[i].type = type;

            this.renderMeetings.push(<Meeting x={x} y = {y} key = {key} id = {key} type = {type}/>)
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
        //this.renderMeetings = [];
        /* for (let i = 0; i < this.numOfMeetings; i ++){
            let x = Math.floor(1+Math.random() * 98);
            let y = Math.floor(1+Math.random() * 98);
            this.meetings[i] = {}
            this.meetings[i].x = x;
            this.meetings[i].y = y;

            let key = "m" + x;
            let type = 0;
            if (x > 50){
                type = 1;
            }

            this.meetings[i].type = type;

            this.renderMeetings.push(<Meeting x={x} y = {y} key = {key} id = {key} type = {type}/>)
            

        } */


        for (let i = 0; i < this.numOfNodes; i ++){
            let idNum =  this.key + 'a' + i;
            this.passNodes[i] = idNum;
            let num = Math.floor(Math.random() * this.numOfMeetings);
            this.nodeMeeting[idNum] = this.meetings[num];
            
            
            
            
            
           
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

       
        
        if (this.allSick){
            clearInterval(this.timerID);
            document.getElementById("overshadow").style.display = 'block';
            
            return (
            
           
            <>  
                {this.allSick && <div id = {"endmsg"}>{this.message}</div>}
                <div>

                    
                    <div>{this.state.nodes}</div>
                    
                    <div>{this.transmissions}</div>

                    <div>{this.renderMeetings}</div>
                </div>
            </>
            
            )
        }
        
        return ( 
            <>
            {this.allSick && <div id = {"endmsg"}>{this.message}</div>}
            <div>
                
                <div>{this.state.nodes}</div>
                
                <div>{this.transmissions}</div>

                <div>{this.renderMeetings}</div>
            </div>
            </>
           
        )

        /* return ( 
            <>
            {this.allSick && <div id = {"endmsg"}>{this.message}</div>}
            <div>
                <div id = "home">Home</div>
                <div>{this.state.nodes}</div>
                
                <div>{this.transmissions}</div>

                <div>{this.renderMeetings}</div>
            </div>
            </>
           
        ) */
    }
}

export default Plot;