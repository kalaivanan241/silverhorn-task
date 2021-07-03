import React from "react";
import { useSelector } from "react-redux";
import { selectTodos } from "../features/todos/todoSlice";

export const todoTabs = ["All", "Completed", "Active"];

const useTodoFilter = () => {
  const todosList = useSelector(selectTodos);
  const [activeTab, setActiveTab] = React.useState(todoTabs[0]);
  const [filteredTodos, setFilteredTodos] = React.useState([]);
  React.useEffect(() => {
    if (activeTab === "All") {
      setFilteredTodos(todosList);
    } else if (activeTab === "Completed") {
      setFilteredTodos([...todosList.filter((t) => t.completed)]);
    } else {
      setFilteredTodos([...todosList.filter((t) => !t.completed)]);
    }
  }, [activeTab, todosList]);

  return { setActiveTab, filteredTodos, activeTab };
};

export default useTodoFilter;
