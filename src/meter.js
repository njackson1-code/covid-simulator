import React from 'react';
import Cough from './cough.js';
import Mask from './coronavirus.png';
import Angel from './angel.png';
import { tsParenthesizedType, thisExpression } from '@babel/types';
import { checkServerIdentity } from 'tls';

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

        this.timerID = setInterval(
            () => this.updateMeter(),
            50
          );
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

        return(<div id = "meter">
                <div id = "negativeMeter"></div>
                <div id = "positiveMeter"></div>          
                <div id = "recoveredMeter"></div>
                <div id = "deceasedMeter"></div>
            </div>)
        
    }
}


export default Meter;