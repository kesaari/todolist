import { Component } from "react";

import { TodoItem } from "./TodoItem";

class TodoList extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map((todo) => (
          <TodoItem
            key={todo.id}
            id={todo.id}
            text={todo.text}
            birthDate={todo.birthDate}
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

export { TodoList };
