import React, { Component } from "react";
import "./App.css";
class App extends Component {
    state = {
      todos: []
    }
    componentDidMount() {
      fetch('http://localhost:901/pendingTask')
      .then(res => res.json())
      .then((data) => {
        this.setState({ todos: data })
        //console.log(this.state.todos)
      })
      .catch(console.log)
    }
     render() {
        return (
            <div >
                {this.state.todos.map((todo) => (
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">{todo.task}</h5>
                        </div>
                    </div>
                ))}
            </div>
            
        );
    }  
  }

export default App;