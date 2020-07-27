import React from 'react';
import { tsParenthesizedType, thisExpression } from '@babel/types';

class Transmit extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
        this.id = props.id;
        this.x = props.x;
        this.y = props.y;
      
    }

    componentDidMount() {
        this.update();
        

       

    }

    update(){
        let element = document.getElementById(this.id);
        element.style.left = this.x + "%";
        element.style.top = this.y + '%';
        element.style.width = "0px";
        element.style.height = "0px"
        element.style.transition = '1.5s';
        
        this.setState({
            date: new Date()
        });

        this.timerID = setTimeout(
            () => {element.style.width = "40px";
            element.style.height = "40px"},
            50
          );
    }

    render(){
        return (
            <div className={"transmit"} id = {this.id}></div>
        )
    }

}

export default Transmit;