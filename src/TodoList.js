import React, { Component } from 'react';
import TodoItem from './TodoItem';

// class TodoList extends Component {
//     render() {
//       return (
//         <ul>
//           {this.props.todos.map((todo) => (
//             <TodoItem key={todo.id} index={todo.id} todo={todo.text} completeTodo={this.props.completeTodo} deleteTodo={this.props.deleteTodo} editTodo={this.props.editTodo} completed={todo.completed}/>
//           ))}
//         </ul>
//       );
//     }
//   }

class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            completeTodo={this.props.completeTodo}
            deleteTodo={this.props.deleteTodo}
            editTodo={this.props.editTodo}
            saveEditedTodo={this.props.saveEditedTodo}
            completed={todo.completed}
            editingId={this.props.editingId}
            editingText={this.props.editingText}
          />
        ))}
      </ul>
    );
  }
}
  
  export default TodoList;