import React, { Component } from "react";
import { Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService.js'

const AppContext = React.createContext()

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
export default HeaderComponent