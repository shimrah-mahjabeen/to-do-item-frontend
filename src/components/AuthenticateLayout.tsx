import React from 'react';
import TodoSidebar from './TodoSidebar';
import { TodoProvider } from '../providers/TodoProvider';

interface AuthenticatedLayoutProps {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<AuthenticatedLayoutProps> = ({ children }) => {
  return (
    <>
      <TodoProvider>
        <div className="flex h-75 w-screen">
          <TodoSidebar />
          <div className="flex flex-col flex-1 overflow-hidden p-10">
            <main className="flex-1 overflow-x-hidden overflow-y-auto">
              <div className="px-20 pt-1">
                {children}
              </div>
            </main>
          </div>
        </div>
      </TodoProvider>
    </>
  );
};

export default AuthenticatedLayout;