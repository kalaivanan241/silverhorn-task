import React from "react";
import styles from "./TodoItem.module.css";

const TodoItem = ({ todo, onClick, onDelete }) => {
  return (
    <li
      className={`${styles.todoItem} ${todo.completed ? styles.selected : ""}`}
    >
      <span onClick={onClick}>{todo.title}</span>
      <span onClick={onDelete}>
        <i className="fa fa-trash-o" aria-hidden="true"></i>
      </span>
    </li>
  );
};

export default TodoItem;
