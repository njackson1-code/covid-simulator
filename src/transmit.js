import React from 'react';
import { tsParenthesizedType, thisExpression } from '@babel/types';
import * as $ from 'jquery';

class Transmit extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
        this.id = props.id;
        let widthOffset = document.getElementById("graphArea").clientWidth;
        let heightOffset = document.getElementById("graphArea").clientHeight;

        console.log(parseFloat(props.x)/100)
        this.x = parseFloat(props.x)/100 *parseFloat(widthOffset) + 10;
        this.y = parseFloat(props.y)/100 *parseFloat(heightOffset) +10;
        //console.log(this.x)
      
    }

    componentDidMount() {
        this.update();
        

       

    }

    update(){
        
        let element = document.getElementById(this.id);
        element.style.left = this.x + "px";
        element.style.top = this.y + 'px';
        element.style.width = "1px";
        element.style.height = "1px"
        element.style.transition = '1.5s';
        

        var $el = $("#" + this.id);
        
        this.setState({
            date: new Date()
        });

        this.timerID = setTimeout(
            () => {$el.css('-webkit-transform', "scale(" + 35 + ")");
                $el.css('border-radius', "50%");
                //element.style.width = "40px";
            //element.style.height = "40px"
        },
            5
          );

      
    }

    render(){
        return (
            <div className={"transmit"} id = {this.id}></div>
        )
    }

}

export default Transmit;