import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'

const AppContext = React.createContext()
class TodoApp extends Component {

    state = {
        isUserLoggedIn: AuthenticationService.isUserLoggedIn()
    }

    login = (username, password) => {
        AuthenticationService.registerSuccesfulLogin(username, password);
        this.setState({
            isUserLoggedIn: true
        })
    }

    logout = () => {
        AuthenticationService.logout()
        this.setState({
            isUserLoggedIn: false
        })
    }

    render() {
        return (
            <AppContext.Provider value={{ isUserLoggedIn: this.state.isUserLoggedIn, login: this.login, logout: this.logout }}>
                <div className="TodoApp">
                    <Router>
                        <>
                            <HeaderComponent />
                            <Switch>
                                <Route path="/" exact component={LoginComponent} />
                                <Route path="/login" component={LoginComponent} />
                                <AuthenticatedRoute path="/welcome/:name" component={WelcomeComponent} />
                                <AuthenticatedRoute path="/todos/" component={ListTodosComponent} />
                                <AuthenticatedRoute path="/logout/" component={LogoutComponent} />
                                <Route component={ErrorComponent} />
                            </Switch>
                            <FooterComponent />
                        </>

                    </Router>
                </div>
            </AppContext.Provider>
        )
    }
}
class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div>Welcome {this.props.match.params.name} You can manage your todos <Link to="/todos"> here</Link></div>
            </>
        )
    }
}

class HeaderComponent extends Component {

    render() {

        return (
            <AppContext.Consumer>
                {({ isUserLoggedIn, logout }) => <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="https://tr.reactjs.org/tutorial/tutorial.html" className="navbar-brand">React Page</a></div>
                        <ul className="navbar-nav">
                            <li><Link className="nav-link" to="/welcome/react">Home</Link></li>
                            <li><Link className="nav-link" to="/todos">Todos</Link></li>
                        </ul>
                        <ul className="navbar-nav navbar-collapse justify-content-end">
                            {isUserLoggedIn ? <li> <Link className="nav- link" to="/logout" onClick={logout}>Logout</Link></li> : < li > <Link className="nav-link" to="/login">Login</Link></li>}

                        </ul>

                    </nav>
                </header >}
            </AppContext.Consumer>
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
            <div className="container">

                <table className="table">
                    <thead>
                        <tr>
                            <th>id </th>
                            <th>Description</th>
                            <th>Target Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{todo.targetDate.toString()}</td>
                                    </tr>
                            )
                        }

                    </tbody>
                </table>
            </div>


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
    loginClicked(login) {
        if (this.state.username === 'sinan' && this.state.password === 'ulug') {
            login(this.state.username, this.state.password);
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
            <AppContext.Consumer>
                {({ login }) => <div>
                    <h1>Login</h1>
                    <div className="container">
                        {this.state.hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
                        {this.state.showSuccessMessage && <div>Successful</div>}

                        User Name: <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
                        User Password: <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                        <button className="btn btn-success" onClick={() => this.loginClicked(login)}>Login</button>
                    </div>
                </div>}
            </AppContext.Consumer>
        )
    }
}


export default TodoApp