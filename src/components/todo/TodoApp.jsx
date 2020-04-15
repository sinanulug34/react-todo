import React, {Component} from 'react'

class TodoApp extends Component{
    render (){
        return(
            <div className="TodoApp"> 
            <LoginComponent/>
            </div>
        )
    }
}
class LoginComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:'username',
            password:''
        }
        this.handleUsernameChange = this.handleUsernameChange.bind(this)
        this.handlePasswordChange = this.handleUsernameChange.bind(this)
    }
    handleUsernameChange(event){
        console.log(event.target.value);
        this.setState  ({username:event.target.value})
    }
    handlePasswordChange(event){
       console.log(event.target.value);
       this.setState ({password:event.target.value})     
    }
    render(){
        return(
            <div>
           User Name: <input type = "text" name ="username" value={this.state.username} onChange={this.handleUsernameChange}/>
           User Password: <input type = "password" name ="username" value={this.state.password} onChange={this.handlePasswordChange}/>
           <button>Login</button>
           </div>
        )
    }
}

export default TodoApp