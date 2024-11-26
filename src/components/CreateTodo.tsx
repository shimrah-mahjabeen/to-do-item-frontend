import { useState } from 'react';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../store/store';
import { Heading } from './catalyst/heading';
import { Field } from './catalyst/fieldset';
import { Select } from './catalyst/select';
import { Button } from './catalyst/button';
import { TodoDialog } from './TodoDialog';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTodos, selectPaginationPage, setValidFilter } from '../features/todos/todoSlice';

function NewTodo() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation(['common', 'todo']);

  return (
    <>
      <Button type="button" onClick={() => setIsOpen(true)}>
        {t('todo:createTodo')}
      </Button>
      <TodoDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        initialData={{ title: '', description: '', dueOn: null }}
        title={t('todo:newTodo')}
        description={t('todo:todoDesc')}
        saveButtonText={t('todo:addTodo')}
      />
    </>
  );
}

function TodoSelect({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const currentPage = useSelector(selectPaginationPage);
  const { t } = useTranslation(['common', 'todo']);

  useEffect(() => {
    dispatch(setValidFilter(value));
    dispatch(fetchTodos({ status: value, page: currentPage, perPage: 10 }));
  }, [dispatch, value]);

  return (
    <Field>
      <Select
        name="status"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{t('common:all')}</option>
        <option value="pending">{t('common:inprogress')}</option>
        <option value="completed">{t('common:completed')}</option>
      </Select>
    </Field>
  );
}

export default function CreateTodo() {
  const { t } = useTranslation(['common']);
  const [filter, setFilter] = useState<'' | 'pending' | 'completed'>('');

  const handleFilterChange = (value: string) => {
    setFilter(value as '' | 'pending' | 'completed');
  };

  return (
    <div className="flex w-full flex-wrap items-end justify-between gap-4 border-b border-zinc-950/10 pb-6 dark:border-white/10">
      <Heading>{t('welcomeNote')}</Heading>
      <div className="flex w-[30%] justify-end gap-4">
        <TodoSelect value={filter} onChange={handleFilterChange} />
        <NewTodo />
      </div>
    </div>
  );
}


