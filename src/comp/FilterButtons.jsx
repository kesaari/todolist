import { Component } from "react";
import PropTypes from 'prop-types';

class FilterButtons extends Component {

  buttons = [
    { value: "all", text: "Все задачи"},
    { value: "incomplete", text: "В процессе"},
    { value: "completed", text: "Завершенные", function: this.props.deleteCompletedTodos}
  ]
  
  handleFilter = (value) => () => {
    this.props.setFilter(value);
  };

  render() {
    return (
      <div className="filter">
        {this.buttons.map((button) => (
          <button
          key={button.value}
          className={this.props.filter === button.value ? "active" : ""}
          onClick={this.handleFilter(button.value)}>
            {button.text}
          </button>
        ))}
        {this.props.filter === "completed" ?
          <button
          className="clearBtn active"
          onClick={this.props.deleteCompletedTodos}>Очистить</button> : null}
      </div>
    );
  }
};

FilterButtons.propTypes = {
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  deleteCompletedTodos: PropTypes.func
};

export { FilterButtons };
