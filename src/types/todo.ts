export interface Todo {
    id: string;
    title: string;
    description: string | null;
    status?: string;
    dueOn: string | null;
    createdAt?: string;
    updatedAt?: string;
}

export interface TodosCountData {
    taskCounts: {
        total: number;
        pending: number;
        completed: number;
    }
}

export interface GetTodosInput {
    status: string;
    page: number;
    perPage: number;
}

export interface GetTodosData {
    tasks: Todo[];
}

export interface CreateTaskInput {
    title: string;
    description: string;
    status: string;
    dueOn: string | null;
}

export interface CreateTodoResponse {
    createTask: {
        task: Todo;
        errors: string[] | null;
    }
}

export interface DeleteTodoResponse {
    deleteTask: {
        id: string,
        success: boolean;
        errors: string[] | null;
    }
}

export interface DeleteTaskInput {
    id: string;
}

export interface UpdateTaskInput {
    title: string;
    description: string;
    status: string;
    dueOn: string | null;
}

export interface UpdateTodoResponse {
    updateTask: {
        task: {
            id: string;
            title: string;
            description: string;
            status: string;
            dueOn: string;
        };
        errors: string[];
    };
}

export interface UpdateTodoStatusResponse {
    updateTaskStatus: {
        id: string;
        success: boolean;
        errors: string[];
    };
}