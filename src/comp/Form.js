import { Component } from "react";

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
          onChange={this.handleInputChange}
          placeholder="Добавить новую задачу..."
        />
        <button type="submit">Добавить</button>
      </form>
    );
  }
}

export { Form };
