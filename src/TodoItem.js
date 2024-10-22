import React, { Component } from 'react';

// class TodoItem extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//           editing: false,
//           inputValue: this.props.todo
//         };
//       }



//     render() {
//         return (
//         <li className={this.props.completed === true ? 'done' : '' }>


//         {this.state.editing ? (
//                 <>
//                     <input
//                     value={this.state.inputValue}
//                     onChange={(event) => this.setState({ inputValue: event.target.value })}
//                     onKeyPress={this.handleKeyPress}
//                     />
//                     <button onClick={this.handleSave}>Save</button>
//                 </>
//                 ) : (
//                 <>
//                     {this.props.todo.task}
//                     <button onClick={() => this.setState({ editing: true })}>Edit</button>
//                 </>
//                 )}


//             <input 
//             onClick={() => this.props.completeTodo(this.props.index)} 
//             type='checkbox'
//             checked={this.props.completed === true ? true : false }
//             />
//             {this.props.todo}

//             <button className="edit"></button>
//             <button className="remove" onClick={() => this.props.deleteTodo(this.props.index)}></button>
//         </li>
//         );
//     }
// }

class TodoItem extends Component {
    constructor(props) {
      super(props);
      this.state = {
        editing: this.props.id === this.props.editingId,
        inputValue: this.props.text
      };
    }
  
    componentDidUpdate(prevProps) {
      if (prevProps.editingId !== this.props.editingId) {
        this.setState({
          editing: this.props.id === this.props.editingId,
          inputValue: this.props.editingId ? this.props.editingText : this.props.text
        });
      }
    }
  
    handleSave = () => {
      this.props.saveEditedTodo(this.props.id, this.state.inputValue);
    };
  
    handleKeyDown = (event) => {
      if (event.key === 'Enter') {
        this.handleSave();
      }
    };
  
    render() {
      return (
        <li className={this.props.completed ? 'done' : ''}>
          <input
            onClick={() => this.props.completeTodo(this.props.id)}
            type="checkbox"
            checked={this.props.completed}
          />
          {this.state.editing ? (
            <>
              <input
                value={this.state.inputValue}
                onChange={(event) => this.setState({ inputValue: event.target.value })}
                onKeyDown={this.handleKeyDown}
                className='todo'
              />
              <button className="edit" onClick={this.handleSave}></button>
            </>
          ) : (
            <>
              <span className='todo' onClick={() => this.props.editTodo(this.props.id)}>{this.props.text}</span>
              <button className="edit" onClick={() => this.props.editTodo(this.props.id)}></button>
            </>
          )}
          <button className="remove" onClick={() => this.props.deleteTodo(this.props.id)}></button>
        </li>
      );
    }
  }

export default TodoItem;