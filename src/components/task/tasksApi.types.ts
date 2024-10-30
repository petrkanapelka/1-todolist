export type TasksStateType = {
    [key: string]: TaskType[];
};

export type TaskType = {
    id: string;
    title: string;
    isDone: boolean;
};

export type GetTasksResponse = {
    error: string | null;
    totalCount: number;
    items: DomainTask[];
};

export type DomainTask = {
    description: string;
    title: string;
    status: number;
    priority: number;
    startDate: string;
    deadline: string;
    id: string;
    todoListId: string;
    order: number;
    addedDate: string;
};

export type UpdateTaskModel = {
    status: number;
    title: string;
    deadline: string;
    description: string;
    priority: number;
    startDate: string;
};
