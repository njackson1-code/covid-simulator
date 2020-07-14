import React from 'react';
import { tsParenthesizedType } from '@babel/types';

class Cough extends React.Component{
    constructor(props){
        super(props);
        this.state = {date: new Date()};
        this.x = props.x;
        
        this.y = props.y;
    }

    componentDidMount() {
        let element = document.getElementById('cough0');
        
        element.style.left = this.x + 'px';
        element.style.top = this.y + 'px';
        element.style.transition = '3s';

        this.timerID = setTimeout(
            () => this.updatePosition(),
            50
          );


        
    }

    updatePosition(){
        let element = document.getElementById('cough0');
        element.style.width = '10px';
        element.style.height = '10px';
    }


    render(){
        return (
        <div id = {'cough0'} className={"cough"}>

        </div>
        )
    }
}

export default Cough;