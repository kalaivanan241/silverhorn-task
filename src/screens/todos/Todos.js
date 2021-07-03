import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSelector, useDispatch } from "react-redux";
import {
  addTodo,
  updateTodo,
  removeTodo,
  undoTodoDelete,
  fetchTodosAsync,
  selectTodos,
  selectLoading,
} from "./todoSlice";
import DeleteUndoMessage from "../../components/DeleteUndoMessage/DeleteUndoMessage";
import Loader from "../../components/Loader/Loader";
import TabFilter from "../../components/TabFilter/TabFilter";
import TextField from "../../components/TextField/TextField";
import TodoList from "../../components/TodoList/TodoList";
import styles from "./Todos.module.css";
import useTodoFilter, { todoTabs } from "../../hooks/useTodoFilter";

const Todos = () => {
  const todosList = useSelector(selectTodos);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const [todo, setTodo] = useState("");
  const { setActiveTab, filteredTodos, activeTab } = useTodoFilter();
  const [showUndo, setShowUndo] = useState(false);

  useEffect(() => {
    dispatch(fetchTodosAsync());
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo.trim().length > 0) {
      dispatch(
        addTodo({
          id: uuidv4(),
          title: todo,
          completed: false,
        })
      );
      setTodo("");
    }
  };

  const handleDelete = (todoItem) => {
    setShowUndo(false);
    dispatch(removeTodo(todoItem));
    setShowUndo(true);
  };

  const handleUpdate = (todoItem) => {
    dispatch(updateTodo({ ...todoItem, completed: !todoItem.completed }));
  };

  const handleUndo = () => {
    dispatch(undoTodoDelete());
    setShowUndo(false);
  };

  const setShow = React.useCallback(() => {
    return (val) => setShowUndo(val);
  });

  return (
    <div className={styles.todoSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>My Todos</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            label={"Add Todo"}
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </form>
        {!loading ? (
          todosList.length ? (
            <>
              <TabFilter
                tabs={todoTabs}
                activeTab={activeTab}
                onTabClick={(tab) => setActiveTab(tab)}
              />
              {filteredTodos.length ? (
                <TodoList
                  todos={filteredTodos}
                  onDelete={handleDelete}
                  onTodoClick={handleUpdate}
                />
              ) : (
                <div className={styles.noData}>No Data</div>
              )}
            </>
          ) : (
            <div className={styles.noData}>No Data</div>
          )
        ) : (
          <Loader />
        )}
      </div>
      {showUndo && (
        <DeleteUndoMessage handleUndo={handleUndo} setShow={setShow} />
      )}
    </div>
  );
};

export default Todos;
