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
    render(){
        return(
            <div>
           User Name: <input type = "text" name ="username"/>
           User Password: <input type = "password" name ="username"/>
           <button>Login</button>
           </div>
        )
    }
}

export default TodoApp