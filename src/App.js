import React from 'react';
import './App.css';
import Todo from './Components/Todo';
import Axios from 'axios';
import loadingGIF from './loading.gif'
import Header from './Components/Header';

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      newTodo : "",
      loading: false,
      editing: false,
      editingIndex: 0,
      notification: null,
      todos:[]
    }
    this.apiurl = "https://5dfb61d30301690014b8fa75.mockapi.io"
  }

  componentDidMount() {
    Axios.get(`${this.apiurl}/todos`).then(
      (Response)=> {
        this.setState({todos: Response.data, loading: false})
      }
    ).catch(
      this.setState({loading:true})
    )
  }
  
  handleChange = (e) => {
    this.setState({newTodo: e.target.value})
  }

  handleClick = () => {
    Axios.post(`${this.apiurl}/todos`, {
      name: this.state.newTodo
    }).then(
      (Response)=> {
        const oldtodo = this.state.todos;
        oldtodo.push(Response.data) 
        this.setState({todos: oldtodo, loading:false})
      }
    )
    this.setState({newTodo: "", loading:true})
    this.alert("todo list successfully added");
  }

  deleteTodo = (index) => {
    const todos = this.state.todos;
    const todo = todos[index]

    Axios.delete(`${this.apiurl}/todos/${todo.id}`)

    delete todos[index]

    this.setState({todos})
    this.alert("todo list successfully deleted");

  }

  editTodo = (index) =>{
    const todo = this.state.todos[index]
    this.setState({newTodo: todo.name, editing:true, editingIndex: index})
  }

  updateTodo = () => {
    const todo = this.state.todos[this.state.editingIndex];

    Axios.put(`${this.apiurl}/todos/${todo.id}`, {
      name: this.state.newTodo
    }).then(
      (Response)=> {
        const todos = this.state.todos
        todos[this.state.editingIndex] = Response.data
        this.setState({todos, editing: false, newTodo: ""})
        this.alert("todo list successfully updated");
      }
    )
  }

  alert = (notification) => {
    this.setState({notification})

    setTimeout(()=> {
      this.setState({notification:null})
    }, 2000)
  }

  render(){
    return (
      <div className="app">
        <Header />
        <div className="container">
        { this.state.notification && (
          <div className="alert alert-success mt-4">
            <div>{this.state.notification}</div>
          </div>
        )}
        
        <div>
          <input 
            className="form-control mt-4"
            type="text"
            name="todo"
            placeholder="Enter Todo list"
            onChange={this.handleChange}
            value={this.state.newTodo}
            />
        </div>
        <div className="text-center">
          <button className="btn btn-primary my-3" disabled={!this.state.newTodo} onClick={this.state.editing ? this.updateTodo : this.handleClick }>{this.state.editing ? "Update Todo" : "Add Todo"}</button>
        </div>
        {this.state.loading && <div className="text-center"><img style={{height:"50px"}}  src={loadingGIF} alt="loading" /></div>}
        {this.state.editing ? null : (
          <div className="list-group px-5">
            {this.state.todos.map((todo,index)=>(
              <Todo todo={todo} deleteTodo={()=>this.deleteTodo(index)} editTodo={()=>this.editTodo(index)} key={todo.id}/>
              ))}
          </div>
        )}
      </div>
      </div>
    )
  }
}
export default App;
