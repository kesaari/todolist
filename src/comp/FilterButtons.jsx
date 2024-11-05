import { Component } from "react";
import PropTypes from 'prop-types';

class FilterButtons extends Component {

  buttons = [
    { value: "all", text: "Все задачи"},
    { value: "completed", text: "Завершенные"},
    { value: "incomplete", text: "В процессе"}
  ]
  
  handleFilter = (value) => () => {
    this.props.setFilter(value);
  };

  render() {
    const { filter, deleteCompletedTodos } = this.props
    return (
      <div className="filter">
        {this.buttons.map((button) => (
          <button
          key={button.value}
          className={filter === button.value ? "active" : ""}
          onClick={this.handleFilter(button.value)}>
            {button.text}
          </button>
        ))}
        {filter === "completed" ?
          <button
          className="clearBtn active"
          onClick={deleteCompletedTodos}>Очистить</button> : null}
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
