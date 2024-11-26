import { createContext } from 'react';
import { Todo, CreateTaskInput} from '../types/todo';

export interface TodoContextType {
  createTodo: (todoInput: CreateTaskInput) => Promise<Todo | undefined>;
  deleteTodo: (id: string) => Promise<boolean | undefined>;
  updateTodo: (todoInput: Partial<Todo> & { id: string }) => Promise<Todo | undefined>;
  updateTodoStatus: (id: string, status: string) => Promise<any | undefined>;
}

export const TodoContext = createContext<TodoContextType>({
  createTodo: async () => undefined,
  deleteTodo: async () => undefined,
  updateTodo: async () => undefined,
  updateTodoStatus: async () => undefined
});

