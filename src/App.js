import TodoList from './TodoList';
import './App.css';
import { Component } from 'react';

// class App extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       todos: this.getLocalStorage(),
//       inputValue: '',
//       filter: 'all',
//       editingId: null,
//       editingText: ''
//     };
//   }

//   getLocalStorage() {
//     const todos = localStorage.getItem('todos');
//     return todos ? JSON.parse(todos) : [];
//   }
  
//   updateLocalStorage(todos) {
//     localStorage.setItem('todos', JSON.stringify(todos))
//   }

//   addTodo = (event) => {
//     event.preventDefault();
//     if (this.state.inputValue) {
//       const newTodos = {
//         id: Date.now(),
//         text: this.state.inputValue,
//         completed: false,
//         createdAt: new Date(),
//       };

//       this.setState((prevState) => {
//         const updatedTasks = [...prevState.todos, newTodos];
//         this.updateLocalStorage(updatedTasks);
//         console.log(prevState);
//         return { todos: updatedTasks, inputValue: '' };

//       });
//     }

    
//   };

//   completeTodo = (id) => {
//     this.setState((prevState) => {
//       const updatedTasks = prevState.todos.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       );
//       this.updateLocalStorage(updatedTasks);
//       return { todos: updatedTasks };
//     });
//   };

//   deleteTodo = (id) => {
//     this.setState((prevState) => {
//       const updatedTasks = prevState.todos.filter((task) => task.id !== id);
//       this.updateLocalStorage(updatedTasks);
//       return { todos: updatedTasks };
//     });
//   };

//   setFilter = (filter) => {
//     this.setState({ filter });
//   };

//   editTodo = (id) => {
//     const task = this.state.todos.find((task) => task.id === id);
//     if (task) {
//       this.setState({ editingId: id, editingText: task.text });
//     }
//   };

//   render() {
//     const filteredTodos = this.state.todos.filter(todo => {
//       if (this.state.filter === 'all') return true;
//       if (this.state.filter === 'completed') return todo.completed;
//       return !todo.completed;
//     });

//     return (
      

//       <div className="App">
//         <form onSubmit={this.addTodo}>
//           <input value={this.state.inputValue} onChange={(event) => this.setState({ inputValue: event.target.value })} />
//           <button type="submit">Add Todo</button>
//         </form>
//         <button onClick={() => this.setFilter('all')}>Все</button>
//         <button onClick={() => this.setFilter('incompleted')}>Текущие</button>
//         <button onClick={() => this.setFilter('completed')}>Выполненные</button>
//         <TodoList 
//         todos={filteredTodos} 
//         completeTodo={this.completeTodo} 
//         deleteTodo={this.deleteTodo} 
//         editTodo={this.editTodo}/>
//       </div>
//     );
//   }
// }

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.getLocalStorage(),
      inputValue: '',
      filter: 'all',
      editingId: null,
      editingText: ''
    };
  }

  getLocalStorage() {
    const todos = localStorage.getItem('todos');
    return todos ? JSON.parse(todos) : [];
  }

  updateLocalStorage(todos) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  addTodo = (event) => {
    event.preventDefault();
    if (this.state.inputValue) {
      const newTodo = {
        id: Date.now(),
        text: this.state.inputValue,
        completed: false,
        createdAt: new Date(),
      };

      this.setState((prevState) => {
        const updatedTodos = [...prevState.todos, newTodo];
        this.updateLocalStorage(updatedTodos);
        return { todos: updatedTodos, inputValue: '' };
      });
    }
  };

  completeTodo = (id) => {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      );
      this.updateLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
  };

  deleteTodo = (id) => {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.filter((todo) => todo.id !== id);
      this.updateLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
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
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.map((todo) =>
        todo.id === id ? { ...todo, text } : todo
      );
      this.updateLocalStorage(updatedTodos);
      return { todos: updatedTodos, editingId: null, editingText: '' };
    });
  };

  deleteCompletedTodos = () => {
    this.setState((prevState) => {
      const updatedTodos = prevState.todos.filter((todo) => !todo.completed);
      this.updateLocalStorage(updatedTodos);
      return { todos: updatedTodos };
    });
  };

  render() {
    const filteredTodos = this.state.todos.filter(todo => {
      if (this.state.filter === 'all') return true;
      if (this.state.filter === 'completed') return todo.completed;
      return !todo.completed;
    }).sort((a, b) => a.completed - b.completed);

    return (
      <div className="app">
        <h1>to<span>do</span></h1>
        <div className='content'>
        <form onSubmit={this.addTodo}>
          <input className='input' value={this.state.inputValue} onChange={(event) => this.setState({ inputValue: event.target.value })} placeholder='Добавить новую задачу...'/>
          <button type="submit">Добавить
          </button>
        </form>

        <div className='filter'>
        <button 
        className={this.state.filter === 'all' ? 'active' : false}
        onClick={() => this.setFilter('all')}>Все задачи</button>
        <button 
        className={this.state.filter === 'completed' ? 'active' : ''}
        onClick={() => this.setFilter('completed')}>Завершенные</button>
        {this.state.filter === 'completed' && (
          <button className='clearBtn active' onClick={this.deleteCompletedTodos}>Очистить</button>
        )}
        <button 
        className={this.state.filter === 'incomplete' ? 'active' : ''}
        onClick={() => this.setFilter('incomplete')}>В процессе</button>
        </div>

        <div className='statistics'>
          <div>Всего задач<span className='counter'>{this.state.todos.length}</span></div>
          <div>Завершено задач<span className='counter'>{this.state.todos.filter(task => task.completed).length} из {this.state.todos.length}</span></div>
        </div>

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





