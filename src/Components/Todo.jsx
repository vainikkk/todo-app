import React from 'react';

const Todo = (props) => {
  return (
    <div>
      <div className="list-group-item overflow-hidden mb-1">
        {props.todo.name}
        <button className="btn-sm btn-danger float-right" onClick={props.deleteTodo}>X</button>
        <button className="btn-sm btn-info float-right mr-4" onClick={props.editTodo}>U</button>
      </div> 
    </div>
  )
}

export default Todo;