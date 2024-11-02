import { Component } from "react";
import { formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale";
import PropTypes from 'prop-types';

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
    this.setState({ editing: false });
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

  handleInput = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  handleStatus = (id) => () => {
    this.props.completeTodo(id);
  };

  delete = (id) => () => {
    this.props.deleteTodo(id);
  };

  edit = (id) => () => {
    this.setState({ editing: true })
    this.props.editTodo(id);
  };

  render() {
    return (
      <li className={this.props.completed ? "done" : ""}>
        <input
          onChange={this.handleStatus(this.props.id)}
          type="checkbox"
          checked={this.props.completed}
        />
        {this.state.editing ? (
          <>
            <input
              value={this.state.inputValue}
              onChange={this.handleInput}
              onKeyDown={this.handleKeyDown}
              onBlur={this.handleSave}
              className="todo"
            />
          </>
        ) : (
          <>
            <div
              className="tooltip_cont"
              onMouseEnter={this.show}
              onMouseLeave={this.hide}
            >
              <div className="todo" onClick={this.edit(this.props.id)}>
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
          </>
        )}
        {!this.props.completed && (
          <button className="edit" onClick={this.edit(this.props.id)}></button>
        )}
        <button
          className="remove"
          onClick={this.delete(this.props.id)}
        ></button>
        <div></div>
      </li>
    );
  }
}

TodoItem.defaultProps = {
  editing: null,
  inputValue: '',
  visibilityTooltip: false,
};

TodoItem.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string,
  birthDate: PropTypes.string,
  completeTodo: PropTypes.func,
  deleteTodo: PropTypes.func,
  editTodo: PropTypes.func,
  saveEditedTodo: PropTypes.func,
  completed: PropTypes.bool,
  editingId: PropTypes.number,
  editingText: PropTypes.string
}

export { TodoItem };
