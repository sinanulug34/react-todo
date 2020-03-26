import './Counter.css'
import React,{ Component } from 'react';
import PropTypes from 'prop-types'

class Counter extends Component{
  constructor(){
    super()
    this.state = {
      counter : 0
    } 
    this.increment = this.increment.bind(this)
  }

  render (){
    return (
      <div className ="counter"> 
        <Counterbutton by = {1} incrementMethod={this.increment}/>
        <Counterbutton by ={5} incrementMethod={this.increment}/>
        <Counterbutton by={10} incrementMethod={this.increment}/>
    <span className="count">{this.state.counter}</span>
      </div>
    );
  }

  increment(by){
    //console.log(`incremet from parent - ${by}`)
     this.setState(
      (prevState) => {
       return {counter: prevState.counter +by}
       }
    );
     }
}
class Counterbutton extends Component{
    constructor(){    

      super()
      this.state = {
        counter : 0
      }
      this.increment = this.increment.bind(this)
    }
    
  render (){
    const style={fontSize:"50px",padding:" 15px 30px"}
  return (
    <div className="counter">
      <button onClick={this.increment} >+ {this.props.by}</button>
    </div>
  )
}
increment(){ 
  this.setState({
    counter: this.state.counter + this.props.by
  }); 
  this.props.incrementMethod(this.props.by);
  }
}
Counterbutton.defaultProps = {
    by:1
}
Counterbutton.propTypes={
  by: PropTypes.number
}
export default Counter

