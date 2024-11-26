import { configureStore } from '@reduxjs/toolkit';
import todoReducer from '../features/todos/todoSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    todos: todoReducer,
    user: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;