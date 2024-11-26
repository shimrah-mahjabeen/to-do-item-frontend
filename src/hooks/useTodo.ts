import { useContext } from 'react';
import { TodoContext, TodoContextType } from '../contexts/TodoContext';

export const useTodos = (): TodoContextType => {
  return useContext(TodoContext);
};

