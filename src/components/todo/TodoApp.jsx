import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" component={LoginComponent} />
                            <Route path="/welcome/:name" component={WelcomeComponent} />
                            <Route path="/todos/" component={ListTodosComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>
                    </>

                </Router>
            </div>

        )
    }
}
class WelcomeComponent extends Component {
    render() {
        return <div>Welcome {this.props.match.params.name}</div>
    }
}

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

            todos: [
                { id: 1, description: 'Learning React' },
                { id: 2, description: 'Learning Spring Boot' },
                { id: 3, description: 'Learning Java' }
            ]
        }
    }


    render() {
        return (<div>
            <h1>List Todos</h1>
            <table>
                <thead>
                        <tr>
                            <th>id </th>
                            <th>description</th>
                        </tr>
                </thead>
                <tbody>
                    {
                        this.state.todos.map(
                            todo =>
                                <tr>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                </tr>
                        )
                    }
                </tbody>
            </table>

        </div>)
    }
}
function ErrorComponent() {
    return <div>An Error Occured.</div>
}

class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'username',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false,

        }
        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }
    handleChange(event) {
        console.log(this.state);
        this.setState(
            {
                [event.target.name]: event.target.value
            }

        )
    }
    loginClicked() {
        if (this.state.username === 'sinan' && this.state.password === 'ulug') {
            this.props.history.push(`/welcome/${this.state.username}`)
            // this.setState({showSuccessMessage:true})
            // this.setState({hasLoginFailed:false})
        } else {
            console.log('Failed')
            this.setState({ showSuccessMessage: false })
            this.setState({ hasLoginFailed: true })
        }

    }
    render() {
        return (
            <div>
                {/* <ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/> */}
                {/* <ShowSuccesfullCredentials showSuccessMessage={this.state.showSuccessMessage}/> */}
                {this.state.hasLoginFailed && <div>Invalid Credentials</div>}
                {this.state.showSuccessMessage && <div>Successful</div>}

                User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                User Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                <button onClick={this.loginClicked}>Login</button>
            </div>
        )
    }
}


export default TodoApp