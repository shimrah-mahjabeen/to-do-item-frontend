import React, { ReactNode } from 'react';
import { useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { TodoContext, TodoContextType } from '../contexts/TodoContext';
import { CREATE_TODO } from '../graphql/mutations/createTodo';
import { DELETE_TODO } from '../graphql/mutations/deleteTodo';
import { UPDATE_TODO } from '../graphql/mutations/updateTodo';
import { UPDATE_TODO_STATUS } from '../graphql/mutations/updateTodoStatus';
import { CreateTaskInput, CreateTodoResponse, DeleteTodoResponse, UpdateTodoResponse, UpdateTodoStatusResponse, Todo } from '../types/todo';
import { addTodo, removeTodo, editTodo, toggleTodo } from '../features/todos/todoSlice';

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const [createTodoMutation] = useMutation<CreateTodoResponse, { input: CreateTaskInput }>(CREATE_TODO);
  const [deleteTodoMutation] = useMutation<DeleteTodoResponse, { id: string }>(DELETE_TODO);
  const [updateTodoMutation] = useMutation<UpdateTodoResponse, { input: Partial<Todo> & { id: string } }>(UPDATE_TODO);
  const [updateTodoStatusMutation] = useMutation<UpdateTodoStatusResponse, { input: { id: string; status: string } }>(
    UPDATE_TODO_STATUS
  );

  const createTodo = async (todoInput: CreateTaskInput) => {
    try {
      const result = await createTodoMutation({ variables: { input: todoInput } });
      if (result.data?.createTask.task) {
        dispatch(addTodo(result.data.createTask.task));
      }
      return result.data?.createTask.task;
    } catch (error) {
      console.error('Error creating todo:', error);
      throw error;
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      const result = await deleteTodoMutation({ variables: { id } });
      if (result.data?.deleteTask.success) {
        dispatch(removeTodo(result.data?.deleteTask.id));
      }
      return result.data?.deleteTask.success;
    } catch (error) {
      console.error('Error deleting todo:', error);
      throw error;
    }
  };

  const updateTodo = async (todoInput: Partial<Todo> & { id: string }) => {
    try {
      const result = await updateTodoMutation({ variables: { input: todoInput } });
      if (result.data?.updateTask.task) {
        dispatch(editTodo(result.data.updateTask.task));
      }
      return result.data?.updateTask.task;
    } catch (error) {
      console.error('Error updating todo:', error);
      throw error;
    }
  };

  const updateTodoStatus = async (id: string, status: string) => {
    try {
      const result = await updateTodoStatusMutation({
        variables: { input: { id: id, status: status } },
      });
      if (result.data?.updateTaskStatus.success) {
        dispatch(toggleTodo(result.data.updateTaskStatus.id));
      }
      return undefined;
    } catch (error) {
      console.error('Error updating todo status:', error);
      throw error;
    }
  };  

  const contextValue: TodoContextType = {
    createTodo,
    deleteTodo,
    updateTodo,
    updateTodoStatus
  };

  return (
    <TodoContext.Provider value={contextValue}>
      {children}
    </TodoContext.Provider>
  );
};

