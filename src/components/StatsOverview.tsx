import React from 'react';
import { useSelector } from 'react-redux';
import { Divider } from './catalyst/divider';
import { useTranslation } from 'react-i18next';
import { selectCompletedTodos, selectInprogressTodos, selectTotalTodos } from '../features/todos/todoSlice';

interface StatProps {
  title: string;
  value: number;
  change: string;
  changeType: 'increase' | 'decrease';
}

const Stat: React.FC<StatProps> = ({ title, value, change, changeType }) => {
  const changeColor = changeType === 'increase' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <div className="flex flex-col items-start">
      <h3 className="text-sm font-medium text-gray-500">{title}</h3>
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <div className={`flex items-center mt-1 ${changeColor} rounded-full px-2 py-0.5 text-xs font-medium`}>
        {change}
      </div>
    </div>
  );
};

const StatsOverview: React.FC = () => {
  const totalTodos = useSelector(selectTotalTodos);
  const completedTodos = useSelector(selectCompletedTodos);
  const inProgressTodos = useSelector(selectInprogressTodos);

  const { t } = useTranslation(['common', 'todo']);

  return (
    <>
      <div className="flex justify-between gap-8">
        <Stat
          title={t('todo:totalTodo')}
          value={totalTodos as number}
          change="All todos"
          changeType="increase"
        />
        <Stat
          title={t('todo:completedTodo')}
          value={completedTodos as number}
          change="Completed"
          changeType="decrease"
        />
        <Stat
          title={t('todo:inprogressTodo')}
          value={inProgressTodos as number}
          change="In Progress"
          changeType="increase"
        />
      </div>
      <Divider className='mt-10' />
    </>
  );
};

export default StatsOverview;
