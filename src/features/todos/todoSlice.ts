import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { client } from '../../apollo/client';
import { Todo, GetTodosInput, GetTodosData, TodosCountData } from '../../types/todo';
import { GET_TODOS } from '../../graphql/queries/getTodos';
import { GET_TODOS_COUNT } from '../../graphql/queries/todosCount';

export interface TodosState {
  todos: Todo[];
  filteredTodos: Todo[];
  filter: 'all' | 'pending' | 'completed';
  loading: boolean;
  error: string | null;
  counts: {
    all: number;
    completed: number;
    pending: number;
  };
  currentPage: number;
  validFilter: string;
}

const initialState: TodosState = {
  todos: [],
  filteredTodos: [],
  filter: 'all',
  loading: false,
  error: null,
  counts: {
    all: 0,
    completed: 0,
    pending: 0,
  },
  currentPage: 1,
  validFilter: "",
};

export const fetchTodosCount = createAsyncThunk<TodosCountData, void, { state: RootState }>(
  'todos/fetchTodosCount',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await client.query<TodosCountData>({
        query: GET_TODOS_COUNT,
      });
      return data;
    } catch (error) {
      return rejectWithValue('Failed to fetch todos count');
    }
  }
);

export const fetchTodos = createAsyncThunk<
  Todo[], 
  GetTodosInput, 
  { state: RootState }
>(
  'todos/fetchTodos',
  async (params: GetTodosInput, { rejectWithValue }) => {
    try {
      const { data } = await client.query<GetTodosData>({
        query: GET_TODOS,
        variables: params,
      });
      return data.tasks;
    } catch (error) {
      return rejectWithValue('Failed to fetch todos');
    }
  }
);

const applyFilter = (todos: Todo[], filter: 'all' | 'pending' | 'completed'): Todo[] => {
  switch (filter) {
    case 'pending':
      return todos.filter(todo => todo.status === 'pending');
    case 'completed':
      return todos.filter(todo => todo.status === 'completed');
    default:
      return todos;
  }
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setValidFilter: (state, action: PayloadAction<string>) => {
      state.validFilter = action.payload;
    },
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.unshift(action.payload);
      state.filteredTodos = applyFilter(state.todos, state.filter);
    },
    setFilter: (state, action: PayloadAction<'all' | 'pending' | 'completed'>) => {
      state.filter = action.payload;
      state.filteredTodos = applyFilter(state.todos, state.filter);
    },
    editTodo: (state, action: PayloadAction<{ id: string; title: string; description: string; dueOn: string | null }>) => {
      const todo = state.todos.find(todo => todo.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.description = action.payload.description;
        todo.dueOn = action.payload.dueOn;
        todo.updatedAt = new Date().toISOString();
      }
      state.filteredTodos = applyFilter(state.todos, state.filter);
    },
    toggleTodo: (state, action: PayloadAction<string>) => {
      const todo = state.todos.find(todo => todo.id === action.payload);
      if (todo) {
        todo.status = todo.status === 'completed' ? 'pending' : 'completed';
        todo.updatedAt = new Date().toISOString();
      }
      state.filteredTodos = applyFilter(state.todos, state.filter);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
      state.filteredTodos = applyFilter(state.todos, state.filter);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
        state.filteredTodos = applyFilter(action.payload, state.filter);
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to fetch todos';
      })
      .addCase(fetchTodosCount.pending, (state) => {
        state.counts = { all: 0, completed: 0, pending: 0 }; // Reset counts on pending
      })
      .addCase(fetchTodosCount.fulfilled, (state, action) => {
        state.counts = {
          all: action.payload.taskCounts.total,
          completed: action.payload.taskCounts.completed,
          pending: action.payload.taskCounts.pending,
        };
      })
      .addCase(fetchTodosCount.rejected, (state, action) => {
        state.error = action.payload as string || 'Failed to fetch todos count';
      });
  },
});

export const { addTodo, setFilter, editTodo, toggleTodo, removeTodo, setPage, setValidFilter } = todoSlice.actions;

export const selectTodos = (state: RootState) => state.todos.filteredTodos;
export const selectAllTodos = (state: RootState) => state.todos.todos;
export const selectTodoCounts = (state: RootState) => state.todos.counts;
export const selectFilter = (state: RootState) => state.todos.filter;
export const selectTodosLoading = (state: RootState) => state.todos.loading;
export const selectTodosError = (state: RootState) => state.todos.error;
export const selectPaginationPage = (state: RootState) => state.todos.currentPage;
export const selectValidFilter = (state: RootState) => state.todos.validFilter;
export const selectTotalTodos = (state: RootState) => state.todos.counts.all;
export const selectCompletedTodos = (state: RootState) => state.todos.counts.completed;
export const selectInprogressTodos = (state: RootState) => state.todos.counts.pending;

export default todoSlice.reducer;
