import React from 'react';
import Cough from './cough.js';
import Mask from './coronavirus.png';
import Angel from './angel.png';
import { tsParenthesizedType, thisExpression } from '@babel/types';
import { checkServerIdentity } from 'tls';
import * as $ from 'jquery';

class Meter extends React.Component{
    constructor(props){
        super(props);
        this.state = ({negativeNumbers : props.negativeNumbers, positiveNumbers :props.positiveNumbers, recoveredNumbers : props.recoveredNumbers, deceasedNumbers : props.deceasedNumbers});
    }

    componentDidMount(){
        document.getElementById("positiveMeter").style.height = this.props.positiveNumbers + "%";
        document.getElementById("negativeMeter").style.height = this.props.negativeNumbers + "%";
        document.getElementById("recoveredMeter").style.height = this.props.recoveredNumbers + "%";
        document.getElementById("deceasedMeter").style.height = this.props.deceasedNumbers + "%";

        this.colorFunction();
        
            
        
        this.timerID = setInterval(
            () => this.updateMeter(),
            50
          );
    }

    colorFunction(){
        this.colors = {}; this.colors["positiveMeter"] = 'red'; this.colors["recoveredMeter"] = '#f8ed62'; this.colors["negativeMeter"] = 'lightblue'; this.colors["deceasedMeter"] = 'black';
        let colors = this.colors;
        let description = {"positiveMeter": "Have Covid", "negativeMeter": "No Covid", "recoveredMeter": "Recovered from Covid", "deceasedMeter": "Deceased from Covid"};

        var mouseX;
        var mouseY;
        $(document).mousemove( function(e) {
        mouseX = e.pageX; 
        mouseY = e.pageY;
        $("#meterHover").css({'top':mouseY,'left':mouseX+5})
        });  


        $("#meter div").hover(
            function(){
                console.log(colors[$(this).attr('id')])
                $(this).css("opacity", "0.1");
                $("#meterBox").append("<div id = 'meterHover'>" + description[$(this).attr('id')] + "</div>")
                
                $("#meterHover").css({'top':mouseY,'left':mouseX+5, "background-color": colors[$(this).attr('id')]})
                //css({'top':mouseY,'left':mouseX})
                console.log($("#meterBox"))
                //let element = document.getElementById("meter");
                //element.innerHTML = element.innerHTML + "<div id = 'meterHover'>HELLO</div>"
                //let mh = document.getElementById("meterHover");
                //mh.top = "25px";
                //mh.left = "25px";

            }, 
            function(){
                $(this).css("opacity", "1");
                $("#meterHover").remove()
                
            }
          );
    }

    hover(type){
        console.log("here");
        let element = document.getElementById("meter");
        element.innerHTML = element.innerHTML + "<div id = 'meterHover'></div>"
        let mh = document.getElementById("meterHover");
        mh.top = "25px";
        mh.left = "25px";

    }

    updateMeter(){
        //this.setState(({negativeNumbers : 1}))
    }

    componentWillUpdate(prevProps){
        document.getElementById("positiveMeter").style.height = this.props.positiveNumbers + "%";
        document.getElementById("negativeMeter").style.height = this.props.negativeNumbers + "%";
        document.getElementById("recoveredMeter").style.height = this.props.recoveredNumbers + "%";
        document.getElementById("deceasedMeter").style.height = this.props.deceasedNumbers + "%";

        if (this.props.allSick){
            clearInterval(this.timerID);
        }
        else if (!this.props.allSick && prevProps.allSick){
            this.timerID = setInterval(
                () => this.updateMeter(),
                50
              );
        }
        
    }

    render(){


        return(
            <div id = "meterBox">
                <div id = "meter">
                    <div id = "negativeMeter"></div>
                    <div id = "positiveMeter"></div>          
                    <div id = "recoveredMeter"></div>
                    <div id = "deceasedMeter"></div>
                </div>
            </div>)
        
    }
}


export default Meter;