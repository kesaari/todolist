import { Component } from "react";

class Statistics extends Component {
  render() {
    return (
      <div className="statistics">
        <div>
          Всего задач
          <span className="counter">{this.props.todos.length}</span>
        </div>
        <div>
          Завершено задач
          <span className="counter">
            {this.props.todos.filter((todo) => todo.completed).length} из{" "}
            {this.props.todos.length}
          </span>
        </div>
      </div>
    );
  }
}

export { Statistics };
