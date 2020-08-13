import React from 'react';
import Cough from './cough.js';
import Mask from './coronavirus.png';
import Angel from './angel.png';
import { tsParenthesizedType, thisExpression } from '@babel/types';
import { checkServerIdentity } from 'tls';

class Person extends React.Component{
    constructor(props){
        super(props)

        this.homeX = props.homeX;
        this.homeY = props.homeY;
        
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
        this.angel = false;
        this.deathRate = 0.01;
        this.home = false;
        this.justHome = false;
        
        if (this.id == this.key + 'a0'){
            this.infected = true;
        }
        this.state = {date: new Date()};
        this.allNodes = props.allNodes;
        this.arrived = false;
        this.recovered = false;

        this.first = true;
        this.infex = false;

        
        this.time = 0;
        this.percent = 0;
        this.cough = false;
        if (this.infected){
            this.cough = true;
        }

        
        this.totalDistance = this.xGoal - this.xStart;
        
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

    componentWillUnmount(){
        //console.log(this.id)
        clearInterval(this.timerID);
        clearTimeout(this.recoverTimer);
    }

    stopMovement(){
        clearInterval(this.timerID);
        let element = document.getElementById(this.id);
        if (!this.angel){
            element.velocity("stop", true);
        }
        
    }



    

    getX(){
        return this.x;
    }

    infect() {
        
        this.infex = true;
        let element = document.getElementById(this.id);
        element.style.backgroundColor = 'red';
        
        this.recoverTimer = setTimeout(
            () => this.recover(),
            32500
        );
        this.setState({
            date: new Date()
        });
    }

    recover(){
        
        if (this.recovered){
            return;
        }
        
        this.recovered = true;
        let check = Math.random();
        let color = '#f8ed62';
        if (check <= this.deathRate){
            this.angel = true;
            color = 'white';
            //this.stopMovement();
            this.floatingAngel();
        }
        let element = document.getElementById(this.id);
        element.style.backgroundColor = color;
        this.setState({
            date: new Date()
        });
    }


    floatingAngel(){
        this.yGoal = -200;
        let element = document.getElementById(this.id);
        this.arrived = true;
        this.x = this.convertTimeToX(this.time);
        this.sendData();
        element.velocity("stop", true);
        element.velocity({
            left: this.x + '%',
            top: this.yGoal + '%'
          

        },
        {duration: 12500
           
    
        },

        );
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
        
        if (this.allSick){
            this.stopMovement();
            if (this.infected && !this.recovered && !this.infex){

                this.infect();
            }

            return;
        }
        this.social = document.getElementById("sd").value/100;
        this.time += 50;
        //console.log(this.time)
        
        this.setState({
            date: new Date()
        });

        if (this.arrived){
            if (this.infected == true  && !this.recovered){
                if (!this.infex){
                    this.infect()
                }
            }
            return;
        }
        else if (this.angel){
            if (this.angel){
                this.arrived = true;
                this.sendData();
                return;
            }
        }

       this.x = this.convertTimeToX(this.time);
       this.y = this.equation(this.x);

        if (this.id == '1a0'){
           // console.log(this.y);
        }
      
        
        if (this.infected && !this.recovered){
            
            if (this.infected == true  && !this.recovered){
                if (!this.infex){
                    this.infect()
                }
            }
        }
        
        if (this.percent == 1){
            this.x = this.xGoal;
            this.y = this.yGoal;
            this.arrived = true;

            this.sendData();
            
            
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
               if (this.id == 'a0'){
                   //console.log("reset velocity");
               }
               if (this.home){
                   this.justHome = true;
               }
               else {
                   this.justHome = false;
               }
               if (check < this.social){
                   this.percent = 1;
                   this.xGoal = this.homeX;
                   this.yGoal = this.homeY;
                   let element = document.getElementById(this.id);
                element.style.left = this.x + "%";
            

                element.style.top = this.y + '%';
                this.home = true;
                   
               }
               else {
                   this.home = false;
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

                
                 this.percent = 0;

                 
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
        send['angel'] = this.angel;
        send['home'] = this.home;
        send['justHome'] = this.justHome;
        
        if (this.arrived){
            
            send['percent'] = this.percent;
        }
        
        this.props.parentCallback(send);
    };

    

    componentDidUpdate(prevProps) {
        
        
        this.allSick = this.props.allSick;
        
        if (this.props.infected){
           
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
            this.totalDistance = this.xGoal - this.xStart;
        }
    }

    render() {
        
       
        if (this.angel){
            return (
                <div id = {this.id} className = "person">
                    <img className = 'angel' src = {Angel}></img>
                </div>
            )
        }
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