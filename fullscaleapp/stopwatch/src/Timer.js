import React, { Component } from 'react';

class Timer extends Component{
    componentDidMount(){
       this.Timer = setInterval(this.ticker,1000);
    }
    ticker(){
        this.setState({clock:new Date()-this.props.start});
    }
    constructor(props){
        super(props);
        this.state={
            clock:0
        };
        this.ticker =  this.ticker.bind(this);
    }
    render(){
        var time = Math.round(this.state.clock/1000);
        return(
            <div>
                <p>You have been on this site</p>
                <br/>
                <span>{time}</span>
                <p>Seconds.</p>
            </div>
        );
    }
}
export default Timer;
