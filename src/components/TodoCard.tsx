import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import {
  fetchTodos, setPage, selectTodos, selectFilter, selectTodosLoading, selectTodosError, 
  fetchTodosCount, selectValidFilter, selectPaginationPage, selectInprogressTodos, selectCompletedTodos, selectTotalTodos
} from '../features/todos/todoSlice';
import { Check, Edit2, MoreVertical, Trash2, RefreshCw } from 'lucide-react';
import todoPic from "../assets/todo1.png";
import { motion, AnimatePresence } from 'framer-motion';
import { Divider } from './catalyst/divider';
import { TodoDialog } from './TodoDialog';
import StatsOverview from './StatsOverview';
import { useTranslation } from 'react-i18next';
import { Todo } from '../types/todo';
import { useTodos } from '../hooks/useTodo';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const { deleteTodo, updateTodoStatus } = useTodos();
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation(['common', 'todo']);
  const currentPage = useSelector(selectPaginationPage);
  const validFilter = useSelector(selectValidFilter);
  useEffect(()=> {
    if(isDeleted) {
    dispatch(fetchTodosCount());
    dispatch(fetchTodos({status: validFilter, page: currentPage, perPage: 10}));
    }
  }, [isDeleted]);

  const handleToggleStatus = async () => {
    try {
      await updateTodoStatus(todo.id, todo.status == 'pending' ? 'completed' : 'pending');
      dispatch(fetchTodosCount());
    } catch (error) {
      setIsMenuOpen(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      setIsDeleted(true);
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
    setIsMenuOpen(false);
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="flex items-start space-x-4 bg-white rounded-lg px-0 mb-1"
      >
        <img src={todoPic} alt={todo.title} className="w-24 h-24 rounded-lg object-cover" />
        <div className="flex-grow min-w-0 mt-5">
          <div className="flex justify-between items-start">
            <div className="w-[80%]">
              <h2 className={`text-md font-semibold text-gray-900 truncate ${todo.status === 'completed' ? 'line-through' : ''}`}>
                {todo.title}
              </h2>
              {todo.description && (
                <p
                  className={`${!isExpanded ? "line-clamp-3" : ""
                    } whitespace-normal break-words text-xs text-gray-500 mt-1 text-gray-800`}
                >
                  {todo.description}
                </p>
              )}
              {todo.description && todo.description.length > 100 && (
                <p className="text-xs">
                  {!isExpanded && (
                    <span
                      onClick={() => setIsExpanded(true)}
                      className="text-blue-500 cursor-pointer"
                    >
                      {t('common:showMore')}
                    </span>
                  )}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end space-y-2">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${todo.status === 'completed' ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'
                  }`}>
                  {todo.status === 'completed' ? 'Completed' : 'In Progress'}
                </span>
                <div className="relative">
                  <button
                    className="text-gray-400 hover:text-gray-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                      <div className="py-1">
                        <button
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={handleToggleStatus}
                        >
                          {todo.status === 'completed' ? (
                            <>
                              <RefreshCw className="mr-2 h-4 w-4" />
                              <span>{t('todo:markAsInProgress')}</span>
                            </>
                          ) : (
                            <>
                              <Check className="mr-2 h-4 w-4" />
                              <span>{t('todo:markAsComplete')}</span>
                            </>
                          )}
                        </button>
                        {todo.status === 'pending' && (
                          <button
                            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            onClick={() => {
                              setIsEditing(true);
                              setIsMenuOpen(false);
                            }}
                          >
                            <Edit2 className="mr-2 h-4 w-4" />
                            <span>{t('edit')}</span>
                          </button>
                        )}
                        <button
                          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                          onClick={handleDelete}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          <span>{t('delete')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {todo.dueOn && (
                <p className="text-xs text-gray-500 mt-2">
                  {t('common:dueOn')}: <span className="text-gray-800">{new Date(todo.dueOn).toISOString().split("T")[0]}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      </motion.div>
      <Divider />
      <TodoDialog
        isOpen={isEditing}
        onClose={() => setIsEditing(false)}
        initialData={{
          id: todo.id,
          title: todo.title,
          description: todo.description || '',
          dueOn: todo.dueOn
        }}
        title="Edit Todo"
        description="Make changes to your todo item here."
        saveButtonText="Save changes"
      />
    </>
  );
};

export default function TodoCard() {
  const dispatch = useDispatch<AppDispatch>();
  const todos = useSelector((state: RootState) => selectTodos(state));
  const filter = useSelector((state: RootState) => selectFilter(state));
  const loading = useSelector((state: RootState) => selectTodosLoading(state));
  const error = useSelector((state: RootState) => selectTodosError(state));
  const totalTodos = useSelector(selectTotalTodos);
  const completedTodos = useSelector(selectCompletedTodos);
  const inProgressTodos = useSelector(selectInprogressTodos);
  const valFilter = useSelector(selectValidFilter);
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil((valFilter == 'completed' ? completedTodos : (valFilter == 'pending' ? inProgressTodos: totalTodos)) as number /10) ;
  const { t } = useTranslation(['common', 'todo']);

  const validFilter = useSelector(selectValidFilter);

  useEffect(() => {
    dispatch(fetchTodos({ status: validFilter, page: currentPage, perPage: itemsPerPage }));
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    dispatch(fetchTodosCount());
  }, [])

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      dispatch(setPage(page));
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredTodos = todos.filter(todo => {
    if (filter === 'pending') return todo.status === 'pending';
    if (filter === 'completed') return todo.status === 'completed';
    return true;
  });

  return (
    <div className="my-12">
      <StatsOverview />
      <div className="overflow-y-auto max-h-[30rem] pr-2 space-y-4">
        <AnimatePresence>
          {filteredTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </AnimatePresence>
      </div>
      <div className="flex justify-center mt-4 space-x-2">
        <button
          className={`px-4 py-2 rounded-md border border-gray-300 text-gray-500 ${currentPage === 1 ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-100'
            }`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {t('common:previous')}
        </button>

        <div className="flex space-x-1">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              className={`px-3 py-2 rounded-md ${currentPage === index + 1
                  ? 'bg-gray-200 text-black font-bold'
                  : 'hover:bg-gray-100 text-gray-600'
                }`}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        <button
          className={`px-4 py-2 rounded-md border border-gray-300 text-gray-500 ${currentPage === totalPages
              ? 'cursor-not-allowed opacity-50'
              : 'hover:bg-gray-100'
            }`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          {t('common:next')}
        </button>
      </div>

    </div>
  );
}

