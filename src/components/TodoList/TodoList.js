import React from "react";
import TodoItem from "../TodoItem/TodoItem";
import styles from "./TodoList.module.css";

const TodoList = ({ todos, onTodoClick, onDelete }) => {
  return (
    <ul className={styles.todoList}>
      {todos.map((todo) => {
        return (
          <TodoItem
            todo={todo}
            key={todo.id}
            onClick={() => onTodoClick(todo)}
            onDelete={() => onDelete(todo)}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
