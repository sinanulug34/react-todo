import React, { Component } from "react";
import TodoDataService from "../../api/todo/TodoDataService.js"
import AuthenticationService from "../../components/todo/AuthenticationService.js"

class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            message:null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }
    componentDidMount(){
        this.refreshTodos();
        console.log(this.state)

    }
    refreshTodos(){
        let username = AuthenticationService.getLoggedInUser()
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                this.setState({todos : response.data})
            }
        )
        console.log(this.state)
    }
    deleteTodoClicked(id){
        let username = AuthenticationService.getLoggedInUser()
        console.log(id + ' ' + username)

        TodoDataService.deleteTodo(username,id)
        .then(
            response => {
                this.setState({message : `Delete of todo ${id} Successful `});
                this.refreshTodos()
            }
        )

    }
    updateTodoClicked(id){
        console.log ('update' + id)
        this.props.history.push(`/todos/${id}`)
    }
    
    render() {
        return (<div>
            <h1>List Todos</h1>
          {this.state.message &&<div className="alert alert-success">{this.state.message}</div>}
            <div className="container">

                <table className="table">
                    <thead>
                        <tr>
                            <th>id </th>
                            <th>Description</th>
                            <th>Is Completed?</th>
                            <th>Update</th>
                            <th>Delete</th>
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
                                      <td> <button className="btn btn-success" onClick={() =>this.updateTodoClicked(todo.id)}>Update</button></td> 
                                      <td> <button className="btn btn-warning" onClick={() =>this.deleteTodoClicked(todo.id)}>Delete</button></td> 
                                    </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>


        </div>)
    }
}
export default ListTodosComponent