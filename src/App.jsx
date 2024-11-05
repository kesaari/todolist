import { Component } from "react";
import { Header } from "./comp/Header";
import { Form } from "./comp/Form";
import { Statistics } from "./comp/Statistics";
import { FilterButtons } from "./comp/FilterButtons";
import { TodoItem } from "./comp/TodoItem";

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
  
      this.setState((prev) => {
        const updatedTodos = [...prev.todos, newTodo];
        this.updateLocalStorage(updatedTodos);
        return { todos: updatedTodos, inputValue: "" };
      });
    }
  };

  completeTodo = (id) => {
    this.setState((prev) => {
      const updatedTodos = prev.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      this.updateLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
  };

  deleteTodo = (id) => {
    this.setState((prev) => {
      const updatedTodos = prev.todos.filter((todo) => todo.id !== id);
      this.updateLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
  };

  setFilter = (filter) => {
    this.setState({ filter });
  };

  editTodo = (id) => {
    this.setState((prev) => {
      const todo = prev.todos.find((todo) => todo.id === id);
      if (todo) {
        return { editingId: id, editingText: todo.text };
      }
    });
  };

  saveEditedTodo = (id, text) => {
    this.setState((prev) => {
      const updatedTodos = prev.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      );
      this.updateLocalStorage(updatedTodos);
      return { todos: updatedTodos, editingId: null, editingText: "" };
    });
  };

  deleteCompletedTodos = () => {
    this.setState((prev) => {
      const updatedTodos = prev.todos.filter((todo) => !todo.completed);
      this.updateLocalStorage(updatedTodos);
      return { todos: updatedTodos, filter: "all" };
    });
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

          <Form
            addTodo={this.addTodo}
            inputValue={this.state.inputValue}
            setInputValue={this.setInputValue}
          />

          <FilterButtons
            filter={this.state.filter}
            deleteCompletedTodos={this.deleteCompletedTodos}
            setFilter={this.setFilter}
          />

          <Statistics todos={this.state.todos} />

          <ul>
          {filteredTodos.map(todo => {
            const { id, text, birthDate, completed } = todo;
            const methods = {
              completeTodo: this.completeTodo,
              deleteTodo: this.deleteTodo,
              editTodo: this.editTodo,
              saveEditedTodo: this.saveEditedTodo,
              editingId: this.state.editingId,
              editingText: this.state.editingText,
            };

            return (
              <TodoItem
                key={id}
                id={id}
                text={text}
                birthDate={birthDate}
                completed={completed}
                {...methods}
              />
            );
          })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
