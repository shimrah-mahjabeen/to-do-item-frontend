import { useEffect, useState } from 'react';
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from './catalyst/dialog';
import { Field, Label } from './catalyst/fieldset';
import { Input } from './catalyst/input';
import { Textarea } from './catalyst/textarea';
import { Button } from './catalyst/button';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useTodos } from '../hooks/useTodo';
import { fetchTodos, fetchTodosCount, selectValidFilter, selectPaginationPage } from '../features/todos/todoSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import toast from 'react-hot-toast';

const customStyles = `
  .react-datepicker-wrapper {
    width: 100%;
  }
  .react-datepicker__input-container input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.375rem;
    border: 1px solid #d1d5db;
  }
`;

interface TodoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: {
    id?: string;
    title: string;
    description: string;
    dueOn: string | null;
  };
  title: string;
  description: string;
  saveButtonText: string;
}

export function TodoDialog({
  isOpen,
  onClose,
  initialData,
  title,
  description,
  saveButtonText
}: TodoDialogProps) {
  const [todoTitle, setTodoTitle] = useState(initialData?.title || '');
  const [todoDescription, setTodoDescription] = useState(initialData?.description || '');
  const [isCreated, setCreated] = useState(false);
  const [todoDueDate, setTodoDueDate] = useState<Date | null>(
    initialData?.dueOn ? new Date(initialData.dueOn) : null
  );

  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(selectPaginationPage);
  const validFilter = useSelector(selectValidFilter);

  const { createTodo, updateTodo } = useTodos();

  useEffect(() => {
    if (isOpen) {
      setTodoTitle(initialData?.title || '');
      setTodoDescription(initialData?.description || '');
      setTodoDueDate(initialData?.dueOn ? new Date(initialData.dueOn) : null);
      setCreated(false);
    }
  }, [isOpen, initialData]);

  useEffect(() => {
    if (isCreated) {
      dispatch(fetchTodosCount());
      dispatch(fetchTodos({ status: validFilter, page: currentPage, perPage: 10 }));
    }
  }, [isCreated]);

  const validateInputs = () => {
    if (!todoTitle.trim()) {
      toast.error('Title is required.');
      return false;
    }
  
    if (!todoDescription.trim()) {
      toast.error('Description is required.');
      return false;
    }

    if (todoDueDate && isNaN(todoDueDate.getTime())) {
      toast.error('Please select a valid due date.');
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (validateInputs()) {
      const todoData = {
        title: todoTitle.trim(),
        description: todoDescription.trim(),
        dueOn: todoDueDate ? todoDueDate.toISOString() : null
      };

      try {
        if (initialData?.id) {
          await updateTodo({ id: initialData.id, ...todoData });
        } else {
          await createTodo({ ...todoData, status: 'pending' });
          setCreated(true);
        }
        onClose();
      } catch (error) {
        console.error('Error saving todo:', error);
      }
    }
  };

  return (
    <>
      <style>{customStyles}</style>
      <Dialog open={isOpen} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
        <DialogBody>
          <Field>
            <Label>Title</Label>
            <Input
              name="title"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              placeholder="Enter todo title"
            />
          </Field>
          <Field>
            <Label>Date</Label>
            <DatePicker
              selected={todoDueDate}
              onChange={(date) => setTodoDueDate(date)}
              customInput={<Input name="dueOn" className="w-full" />}
              placeholderText="Select due date"
              className="w-full"
            />
          </Field>
          <Field>
            <Label>Description</Label>
            <Textarea
              name="description"
              value={todoDescription}
              onChange={(e) => setTodoDescription(e.target.value)}
            />
          </Field>
        </DialogBody>
        <DialogActions>
          <Button plain onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>{saveButtonText}</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
