import { Component } from "react";

import { TodoList } from "./comp/TodoList";
import { Header } from "./comp/Header";
// import { Form } from "./comp/Form";
import { Statistics } from "./comp/Statistics";
import { FilterButtons } from "./comp/FilterButtons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.getLocalStorage(),
      inputValue: "",
      filter: "all",
      editingId: null,
      editingText: ""
    };
  }

  getLocalStorage() {
    const todos = localStorage.getItem("todos");
    return todos ? JSON.parse(todos) : [];
  };

  updateLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  addTodo = (event) => {
    event.preventDefault();
    if (this.state.inputValue) {
      const newTodo = {
        id: Date.now(),
        text: this.state.inputValue,
        completed: false,
        birthDate: new Date()
      };

      const updatedTodos = [...this.state.todos, newTodo];
      this.updateLocalStorage(updatedTodos);
      this.setState({ todos: updatedTodos, inputValue: "" });
    }
  };

  completeTodo = (id) => {
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    this.updateLocalStorage(updatedTodos);
    this.setState({ todos: updatedTodos });
  };

  deleteTodo = (id) => {
    const updatedTodos = this.state.todos.filter((todo) => todo.id !== id);
    this.updateLocalStorage(updatedTodos);
    this.setState({ todos: updatedTodos });
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  editTodo = (id) => {
    const todo = this.state.todos.find((todo) => todo.id === id);
    if (todo) {
      this.setState({ editingId: id, editingText: todo.text });
    }
  };

  saveEditedTodo = (id, text) => {
    const updatedTodos = this.state.todos.map((todo) =>
      todo.id === id ? { ...todo, text } : todo
    );
    this.updateLocalStorage(updatedTodos);
    this.setState({ todos: updatedTodos, editingId: null, editingText: "" });
  };

  deleteCompletedTodos = () => {
    const updatedTodos = this.state.todos.filter((todo) => !todo.completed);
    this.updateLocalStorage(updatedTodos);
    this.setState({ todos: updatedTodos, filter: "all" });
  };

  setInputValue = (value) => {
    this.setState({ inputValue: value });
  };

  render() {
    const filteredTodos = this.state.todos
      .filter((todo) => {
        if (this.state.filter === "all") return true;
        if (this.state.filter === "completed") return todo.completed;
        return !todo.completed;
      })
      .sort((a, b) => a.completed - b.completed);

    return (
      <div className="app">
        <Header />
        <div className="content">

        <form onSubmit={this.addTodo}>
            <input
              className="input"
              value={this.state.inputValue}
              onChange={(event) =>
                this.setState({ inputValue: event.target.value })
              }
              placeholder="Добавить новую задачу..."
            />
            <button type="submit">Добавить</button>
          </form>

          {/* <Form
            addTodo={this.addTodo}
            inputValue={this.state.inputValue}
            setInputValue={this.setInputValue}
          /> */}

          <FilterButtons
            filter={this.state.filter}
            setFilter={this.setFilter}
            deleteCompletedTodos={this.deleteCompletedTodos}
          />

          <Statistics todos={this.state.todos} />

          <TodoList
            todos={filteredTodos}
            completeTodo={this.completeTodo}
            deleteTodo={this.deleteTodo}
            editTodo={this.editTodo}
            saveEditedTodo={this.saveEditedTodo}
            editingId={this.state.editingId}
            editingText={this.state.editingText}
          />
        </div>
      </div>
    );
  }
}

export default App;
