import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import LogoutComponent from './LogoutComponent.jsx'
import FooterComponent from './FooterComponent.jsx'
import WelcomeComponent from './WelcomeComponent.jsx'
import ErrorComponent from './ErrorComponent.jsx'
import ListTodosComponent from './ListTodosComponent.jsx'
import TodoComponent from './TodoComponent.jsx'

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
                                <AuthenticatedRoute path="/todos/:id" component={TodoComponent} />
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
class HeaderComponent extends Component {
    render() {

        return (
            <AppContext.Consumer>
                {({ isUserLoggedIn, logout }) => <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                        <div><a href="https://tr.reactjs.org/tutorial/tutorial.html" className="navbar-brand">React Page</a></div>
                        <ul className="navbar-nav">
                            {isUserLoggedIn ? <li><Link className="nav-link" to="/welcome/react">Home</Link></li> : false}
                            {isUserLoggedIn ? <li><Link className="nav-link" to="/todos">Todos</Link></li> : false}
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