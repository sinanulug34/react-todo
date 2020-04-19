import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'

class TodoApp extends Component {
    render() {
        return (
            <div className="TodoApp">
                <Router>
                    <>
                        <HeaderComponent />
                        <Switch>
                            <Route path="/" exact component={LoginComponent} />
                            <Route path="/login" component={LoginComponent} />
                            <Route path="/welcome/:name" component={WelcomeComponent} />
                            <Route path="/todos/" component={ListTodosComponent} />
                            <Route path="/logout/" component={LogoutComponent} />
                            <Route component={ErrorComponent} />
                        </Switch>
                        <FooterComponent />
                    </>

                </Router>
            </div>

        )
    }
}
class WelcomeComponent extends Component {
    render() {
        return <div>Welcome {this.props.match.params.name} You can manage your todos <Link to="/todos"> here</Link></div>
    }
}

class HeaderComponent extends Component {
    render() {
        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="https://tr.reactjs.org/tutorial/tutorial.html" className="navbar-brand">React Page</a></div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/welcome/in28minutes">Home</Link></li>
                        <li><Link className="nav-link" to="/todos">Todos</Link></li>
                    </ul>

                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        <li> <Link className="nav-link" to="/login">Login</Link></li>
                        <li> <Link className="nav-link" to="/logout">Logout</Link></li>
                    </ul>

                </nav>
            </header>
        )
    }
}
class FooterComponent extends Component {
    render() {
        return (
            <footer className="footer">
                    <span className="text-muted">
                        All Rights Reserved 2020
                    </span>
            </footer>
        )
    }
}
class LogoutComponent extends Component {
    render() {
        return (
            <div>
                <h1>You are logged out</h1>
                <div className="container">
                    Thank you for using our application
                </div>
               </div>
        )
    }
}

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {

            todos: [
                { id: 1, description: 'Learning React', done: false, targetDate: new Date() },
                { id: 2, description: 'Learning Spring Boot', done: false, targetDate: new Date() },
                { id: 3, description: 'Learning Java', done: false, targetDate: new Date() }
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
                        <th>Target Date</th>
                        <th>Is Completed?</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.state.todos.map(
                            todo =>
                                <tr>
                                    <td>{todo.id}</td>
                                    <td>{todo.description}</td>
                                    <td>{todo.done.toString()}</td>
                                    <td>{todo.targetDate.toString()}</td>
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