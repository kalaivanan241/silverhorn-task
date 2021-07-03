import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApiData } from "./TodoApi";

const initialState = {
  todos: [],
  status: "idle",
  lastDeletedTodo: { index: -1, todo: null },
};

export const fetchTodosAsync = createAsyncThunk(
  "todos/fetchTodos",
  async () => {
    const data = await fetchApiData();
    return data.sort((t) => t.id);
  }
);

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.todos = [action.payload, ...state.todos];
    },
    removeTodo: (state, action) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      state.todos = [...state.todos.filter((t) => t.id !== action.payload.id)];
      state.lastDeletedTodo = { index: index, todo: action.payload };
    },
    undoTodoDelete: (state) => {
      const todoList = [...state.todos];
      todoList.splice(
        state.lastDeletedTodo.index,
        0,
        state.lastDeletedTodo.todo
      );
      state.todos = todoList;
      state.lastDeletedTodo = { index: -1, todo: null };
    },
    updateTodo: (state, action) => {
      const index = state.todos.findIndex((t) => t.id === action.payload.id);
      const updatedTodos = [...state.todos];
      updatedTodos.splice(index, 1, action.payload);
      state.todos = [...updatedTodos];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodosAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodosAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.todos = [...action.payload.slice(0, 10)];
      });
  },
});

export const { addTodo, removeTodo, updateTodo, undoTodoDelete } =
  todoSlice.actions;

export const selectTodos = (state) => state.todos.todos;

export const selectLoading = (state) => {
  return state.todos.status === "loading";
};

export default todoSlice.reducer;
