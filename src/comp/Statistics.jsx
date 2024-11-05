import { Component } from "react";
import PropTypes from 'prop-types';

class Statistics extends Component {
  render() {
    const todos = this.props.todos;
    const counter = todos.length
    return (
      <div className="statistics">
        <div>
          Всего задач
          <span className="counter">{counter}</span>
        </div>
        <div>
          Завершено задач
          <span className="counter">
            {todos.filter((todo) => todo.completed).length} из{" "} {counter}
          </span>
        </div>
      </div>
    );
  }
}

Statistics.propTypes = {
  todos: PropTypes.object
};


export { Statistics };
