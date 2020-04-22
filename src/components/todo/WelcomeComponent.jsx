import React, { Component } from "react";
import { Link } from 'react-router-dom'
import HelloWorldService from "../../api/todo/HelloWorldService";

class WelcomeComponent extends Component {
    constructor(props) {
        super(props)
        this.retrieveWelcomeMessage = this.retrieveWelcomeMessage.bind(this)
    }

    render() {
        return (
            <>
                <h1>Welcome!</h1>
                <div>Welcome {this.props.match.params.name} You can manage your todos <Link to="/todos"> here</Link></div>
                <div className="container">
                    Click here to get a customized welcome message.
                    <button onClick={this.retrieveWelcomeMessage} className="btn btn-success">Get Welcome Message</button>
                </div>
            </>
        )
    }
    retrieveWelcomeMessage() {
        HelloWorldService.executeHelloWorldService()
    }
}

export default WelcomeComponent