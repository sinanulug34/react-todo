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
    this.decrement = this.decrement.bind(this)
    this.reset = this.reset.bind(this)
  }

  render (){
    return (
      <div className ="counter"> 
        <Counterbutton by = {1} incrementMethod={this.increment} decrementMethod={this.decrement}/>
        <Counterbutton by ={5} incrementMethod={this.increment} decrementMethod={this.decrement}/>
        <Counterbutton by={10} incrementMethod={this.increment} decrementMethod={this.decrement}/>
    <span className="count">{this.state.counter}</span>
   <div><button className="reset" onClick={this.reset}>Reset</button></div>
      </div>
    );
  }

  increment(by){
     this.setState(
      (prevState) => {
       return {counter: prevState.counter +by}
       }
    ); 
     }
     decrement(by){
       this.setState(
        (prevState) => {
         return {counter: prevState.counter -by}
         }
      );
   }
   reset(){
    this.setState({counter: 0});
   }
}
class Counterbutton extends Component{
    constructor(){    

      super()
      this.state = {
        counter : 0
      }
      this.increment = this.increment.bind(this)
      this.decrement = this.decrement.bind(this)
    }
    
  render (){
    const style={fontSize:"50px",padding:" 15px 30px"}
  return (
    <div className="counter">
      <button onClick={this.increment} >+ {this.props.by}</button>
      <button onClick={this.decrement} >- {this.props.by}</button>
    </div>
  )
}
increment(){ 
  this.setState({
    counter: this.state.counter + this.props.by
  }); 
  this.props.incrementMethod(this.props.by);
  }
  decrement(){ 
    this.setState({
      counter: this.state.counter - this.props.by
    }); 
    this.props.decrementMethod(this.props.by);
    }
}
Counterbutton.defaultProps = {
    by:1
}
Counterbutton.propTypes={
  by: PropTypes.number
}
export default Counter

