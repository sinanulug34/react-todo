import './Counter.css'
import React,{ Component } from 'react';

class Counter extends Component{
      //define the initial state in a constructor
      // state => counter 0
    constructor(){
      //initial for a specific compenent in React
      super() // you call this super() method, you can not without this method using this.state.counter //Error 1
      this.state = {
        counter : 0
      }
      //what is the meaning of ? 
      this.increment = this.increment.bind(this)
    }
  render (){
  return (
    <div className="counter">
      <button onClick={this.increment}>+1</button>
      <span className="count">{this.state.counter}</span>
    </div>
  )
}
// eğer bir methodu class içerisinden call edeceksek, function keyword unu kaldırmalısın.
 increment(){ //update state - counter++
  //console.log('increment');
  this.state.counter++;
  // you dont update the state ıf the component directly
  this.setState({
    state: this.state.counter + 1
  }); 
  }
}
export default Counter