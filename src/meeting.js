import React from 'react';
import { tsParenthesizedType, thisExpression } from '@babel/types';
import Mountain from './mountain.png';
import Company from './company.png';
import * as $ from 'jquery';


class Meeting extends React.Component{
    constructor(props){
        super(props);

        this.widthOffset = document.getElementById("graphArea").clientWidth;
        this.heightOffset = document.getElementById("graphArea").clientHeight;

        this.x = parseFloat(props.x)/100 *parseFloat(this.widthOffset) - 25;
        this.y = parseFloat(props.y)/100 *parseFloat(this.heightOffset) - 25;
        this.type = props.type;
        this.id = props.id;
    }

    componentDidMount(){
        
        let element = document.getElementById(this.id);
        
        element.style.left = this.x/parseFloat(this.widthOffset) * 100+ "%";
        element.style.top = this.y/parseFloat(this.heightOffset) * 100 + "%";

        let description = "Indoor Establishment (Higher Rate of Transmission";
        if (this.type != 1){
            description = "Outdoor Area (Lower Rate of Transmission";
        }

        var mouseX;
        var mouseY;
        $(document).mousemove( function(e) {
        mouseX = e.pageX; 
        mouseY = e.pageY;
        $("#meetingHover").css({'top':mouseY-200,'left':mouseX-100})
        });  

        $("#" + this.id).hover(
            function(){
                console.log("y" + mouseY)
                console.log("x" + mouseX)
                $(this).css("opacity", "0.5");
                $("#graphArea").append("<div id = 'meetingHover'>" + description + "</div>")
                $("#meetingHover").css({'top':mouseY-200,'left':mouseX-75, "background-color": "lightgray"})
              

            }, 
            function(){
                $(this).css("opacity", "1");
                $("#meetingHover").remove()
                
            }
          );
    }

    render(){
        if (this.type == 1){
            return(
                <div id = {this.id} className="meeting">
                    <img src={Company}></img>
                </div>
            ) 
        }
        return(
            <div id = {this.id} className="meeting">
                <img src={Mountain}></img>
            </div>
        )
    }
}


export default Meeting;