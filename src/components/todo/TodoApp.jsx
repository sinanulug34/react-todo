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
            password:'',
            hasLoginFailed:false,
            showSuccessMessage:false,

        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }
    handleChange(event){
        console.log(this.state);
        this.setState  (
            {
                [event.target.name]:event.target.value}

            )
    }
    loginClicked(){
        if(this.state.username==='sinanulug' && this.state.password==='dummy'){
            console.log('Successful')
            this.setState({showSuccessMessage:true})
            this.setState({hasLoginFailed:false})
        }else {
            console.log('Failed')
            this.setState({showSuccessMessage:false})
            this.setState({hasLoginFailed:true})
        }

    }
    render(){
        return(
            <div>
                <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>
                <ShowSuccesfullCredentials showSuccessMessage={this.state.showSuccessMessage}/>
                <div>Login Succesful</div>
           User Name: <input type = "text" name ="username" value={this.state.username} onChange={this.handleChange}/>
           User Password: <input type = "password" name ="password" value={this.state.password} onChange={this.handleChange}/>
           <button onClick={this.loginClicked}>Login</button>
           </div>
        )
    }

}
function ShowInvalidCredentials(props) {
        if(props.hasLoginFailed) {
            return <div>Invalid Credentials</div>}
            return null;  
}
function ShowSuccesfullCredentials(props) {
    if(props.showSuccessMessage){
        return <div>Login Successful</div>
    }
    return null;
}

export default TodoApp