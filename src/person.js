import React from 'react';
import Cough from './cough.js';
import Mask from './coronavirus.png';
import { tsParenthesizedType, thisExpression } from '@babel/types';
import { checkServerIdentity } from 'tls';

class Person extends React.Component{
    constructor(props){
        super(props)
        this.xGoal = this.props.meeting['x']  + 2 * Math.random() - 1;
        this.yGoal = this.props.meeting['y'] + 2 * Math.random() - 1;
        this.x = Math.floor(1+Math.random() * 98);
        this.y = Math.floor(1+Math.random() * 98);
        this.xStart = this.x;
        this.yStart = this.y;
        this.id = props.id;
        this.social = props.social;
        this.infected = props.infected;
        this.masks = props.masks;
        
        if (this.id == 'a0'){
            this.infected = true;
        }
        this.state = {date: new Date()};
        this.allNodes = props.allNodes;
        this.arrived = false;
        this.recovered = false;

        this.first = true;
        

        
        this.time = 0;
        this.percent = 0;
        this.cough = false;
        if (this.infected){
            this.cough = true;
        }

        
        this.totalDistance = Math.abs(this.xGoal - this.xStart);
        
    }

    convertTimeToX(time){
        let fractionTime = this.percent;
        
        //console.log(this.totalDistance + this.x)
        let x = (this.totalDistance) * fractionTime + this.xStart;
       
        return x;
    }

    distance(x,y){
        return Math.sqrt(Math.pow(this.xGoal - this.x,2) + Math.pow(this.yGoal - this.y, 2));
    }

    componentDidMount() {
        this.updatePosition();
        this.timerID = setInterval(
          () => this.updatePosition(),
          50
        );

    }

    

    getX(){
        return this.x;
    }

    infect() {
        let element = document.getElementById(this.id);
        element.style.backgroundColor = 'red';
        this.recoverTimer = setTimeout(
            () => this.recover(),
            22500
        );
    }

    recover(){
        let element = document.getElementById(this.id);
        element.style.backgroundColor = '#f8ed62';
        this.recovered = true;
    }

    equation(x){
        return this.slope(this.xStart,this.yStart) * (x - this.xStart) + this.yStart;
    }

    slope(x,y){
        return ((this.yGoal - y)/(this.xGoal - x));
    }

    otherFunction(complete){
        
        this.x = complete;
    }

   

    
    updatePosition(){
        this.social = document.getElementById("sd").value/100;
        this.time += 50;
        //console.log(this.time)
        
        this.setState({
            date: new Date()
        });

        if (this.arrived){
            if (this.infected == true  && !this.recovered){
                if (document.getElementById(this.id).backgroundColor != 'red'){
                    this.infect()
                }
            }
            return;
        }

       this.x = this.convertTimeToX(this.time);
       this.y = this.equation(this.x);

      

        
        if (this.infected == true  && !this.recovered){
            if (document.getElementById(this.id).backgroundColor != 'red'){
                this.infect()
            }
        }
        
        if (this.percent == 1){
            this.x = this.xGoal;
            this.y = this.yGoal;
            this.arrived = true;

            this.sendData();
            this.totalDistance = Math.abs(this.xGoal - this.xStart);
            //let element = document.getElementById("title");
            //element.innerHTML = this.id;
            return;
        }
        else {
            this.sendData();
        }
        var self = this;
        
            if (this.first){
               let check = Math.random();
               if (check < this.social){
                   this.percent = 1;
                   this.xGoal = this.x;
                   this.yGoal = this.y;
                   let element = document.getElementById(this.id);
                element.style.left = this.x + "%";
            

                element.style.top = this.y + '%';
                   return;
               }
           

                let element = document.getElementById(this.id);

                element.style.left = this.x + "%";
                element.style.top = this.y + '%';

                element.velocity({
                    left: this.xGoal + '%',
                    top: this.yGoal + '%'
                  

                },
                {duration: 6500,
                   
                    progress: function(elements, complete, remaining, start, tweenValue) {
                        otherFunction(self, complete);
                        
                    
                    }
                },

                );

                
                 this.time = 0;

                 
            }

            
        
            function otherFunction(self, complete){
                
                self.percent = complete;
                
            }
        

        this.first =  false;
        
    }
    
    
    sendData = () => {
        let send = {};
        send['id'] = this.id;
        send['infected'] = this.infected;
        send['x'] = this.x;
        send['y'] = this.y;
        send['arrived'] = this.arrived;
        send['cough'] = {}
        send['cough'].occur = true;
        send['cough'].x = this.x;
        send['cough'].y = this.x;
        send['recovered'] = this.recovered;
        if (this.arrived){
            
            send['percent'] = this.percent;
        }
        
        this.props.parentCallback(send);
    };

    

    componentDidUpdate(prevProps) {
        
        
        //this.recovered = this.props.recovered;
        if (this.props.infected && !this.infected){
            this.infected = this.props.infected;
            this.cough = true;
            
        }
       
        if (this.props.reset) {
            
            this.arrived = false;
            this.first = true;
            this.xGoal = this.props.meeting['x'] + 2 * Math.random() - 1;
            this.yGoal = this.props.meeting['y'] + 2 * Math.random() - 1;
            this.xStart = this.x;
            this.yStart = this.y;
            this.arrived = false;
            this.percent = 0;
            
        }
    }

    render() {
        
       
       
        if (this.masks){
           
            return (
                <div id = {this.id} className = "person">
                    <img src = {Mask}></img>
                </div>
            )
        }
        return (
            <div id = {this.id} className = "person">
                
            </div>
        )
        
    }


}

export default Person;