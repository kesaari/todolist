import { Component } from "react";
import PropTypes from 'prop-types';

class FilterButtons extends Component {
  
  handleFilter = (value) => () => {
    this.props.setFilter(value);
  };

  render() {
    return (
      <div className="filter">
        <button
          className={this.props.filter === "all" ? "active" : ""}
          onClick={this.handleFilter("all")}
        >
          Все задачи
        </button>
        <button
          className={this.props.filter === "completed" ? "active" : ""}
          onClick={this.handleFilter("completed")}
        >
          Завершенные
        </button>
        {this.props.filter === "completed" && (
          <button
            className="clearBtn active"
            onClick={this.props.deleteCompletedTodos}
          >
            Очистить
          </button>
        )}
        <button
          className={this.props.filter === "incomplete" ? "active" : ""}
          onClick={this.handleFilter("incomplete")}
        >
          В процессе
        </button>
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
