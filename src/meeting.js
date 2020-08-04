import React from 'react';
import { tsParenthesizedType, thisExpression } from '@babel/types';
import Mountain from './mountain.png';
import Company from './company.png';
import * as $ from 'jquery';


class Meeting extends React.Component{
    constructor(props){
        super(props);

        let widthOffset = document.getElementById("graphArea").clientWidth;
        let heightOffset = document.getElementById("graphArea").clientHeight;

        this.x = parseFloat(props.x)/100 *parseFloat(widthOffset) - 25;
        this.y = parseFloat(props.y)/100 *parseFloat(heightOffset) - 25;
        this.type = props.type;
        this.id = props.id;
    }

    componentDidMount(){
        console.log("aqui")
        let element = document.getElementById(this.id);
        console.log(element)
        element.style.left = this.x + "px";
        element.style.top = this.y + "px";
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