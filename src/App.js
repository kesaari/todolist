import logo from './logo.svg';
import './App.css';
import { Component } from 'react';

function App() {
  return ( <div className='conteiner'>
    <Header />
    <TaskList />
  </div>
    
  );
}

export default App;

class Header extends Component {
  render() {
    return( 
      <div className='header'>
      <h1>to<span>do</span></h1>
      <Input />
      <AddButton />
    </div>)
  }
}
class Input extends Component {
  render() {
    return (
      <input placeholder='Добавить новую задачу...' className='input'></input>
    )
  }

  createTask() {

  }
}

class AddButton extends Component {
  render() {
    return (
      <button className='addButton'>Добавить</button>
    )
  }
}

let list = [
  {
    title: 'Попить пива',
    id: 1
  },
  {
    title: 'Сходить в зал',
    id: 2
  },
  {
    title: 'Строить зоопарки',
    id: 3
  },
  {
    title: 'Начать учиться',
    id: 4
  }
]


class TaskList extends Component {
  render() {
    const listItems = list.map((item) => (
      <li key={item.id}>
        <input type='checkbox' />
        {item.title}
        <button className='edit' />
        <button className='remove' />
        </li>
  ));
  
  return <ul>{listItems}</ul>;
  }
}