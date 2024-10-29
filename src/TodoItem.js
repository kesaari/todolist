import { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: this.props.id === this.props.editingId,
      inputValue: this.props.text,
      visibilityTooltip: false
    };
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.editingId !== this.props.editingId) {
      this.setState({
        editing: this.props.id === this.props.editingId,
        inputValue: this.props.editingId
          ? this.props.editingText
          : this.props.text
      });
    }
  };

  handleSave = () => {
    this.props.saveEditedTodo(this.props.id, this.state.inputValue);
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter") {
      this.handleSave();
    }
  };

  show = () => {
    this.setState({ visibilityTooltip: true });
  };

  hide = () => {
    this.setState({ visibilityTooltip: false });
  };

  render() {
    return (
      <li className={this.props.completed ? "done" : ""}>
        <input
          onClick={() => this.props.completeTodo(this.props.id)}
          type="checkbox"
          checked={this.props.completed}
        />
        {this.state.editing ? (
          <>
            <input
              value={this.state.inputValue}
              onChange={(event) =>
                this.setState({ inputValue: event.target.value })
              }
              onKeyDown={this.handleKeyDown}
              onBlur={this.handleSave}
              className="todo"
            />
            <button className="edit" onClick={this.handleSave}></button>
          </>
        ) : (
          <>
            <div
              className="tooltip_cont"
              onMouseEnter={this.show}
              onMouseLeave={this.hide}>
              <div
                className="todo"
                onClick={() => this.props.editTodo(this.props.id)}>
                {this.props.text}
                {this.state.visibilityTooltip && (
                  <div className="tooltip">
                    {formatDistanceToNow(new Date(this.props.birthDate), {
                      addSuffix: true,
                      locale: ru
                    })}
                  </div>
                )}
              </div>
            </div>

            <button
              className="edit"
              onClick={() => this.props.editTodo(this.props.id)}></button>
          </>
        )}
        <button
          className="remove"
          onClick={() => this.props.deleteTodo(this.props.id)}></button>
        <div></div>
      </li>
    );
  }
}

export default TodoItem;
