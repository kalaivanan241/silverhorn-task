import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../screens/todos/todoSlice";

export const store = configureStore({
  reducer: {
    todos: todoReducer,
  },
});
