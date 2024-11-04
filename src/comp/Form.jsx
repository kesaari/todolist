import { Component } from "react";
import PropTypes from 'prop-types';

class Form extends Component {
  
  handleInput = (event) => {
    this.props.setInputValue(event.target.value);
  };

  render() {
    return (
      <form onSubmit={this.props.addTodo}>
        <input
          className="input"
          value={this.props.inputValue}
          onChange={this.handleInput}
          placeholder="Добавить новую задачу..."
        />
        <button type="submit">Добавить</button>
      </form>
    );
  }
};

Form.propTypes = {
  addTodo: PropTypes.func,
  inputValue: PropTypes.string,
  setInputValue: PropTypes.func
};

export { Form };