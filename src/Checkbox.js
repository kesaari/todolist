import React, { Component } from 'react';

class Checkbox extends Component {

  render() {
    return (
        <input 
        onClick={() => this.props.completeTodo(this.props.index)} 
        type='checkbox'
        checked={this.props.completed === true ? true : false }
        />
    );
  }
}

export default Checkbox;