export type FilterStatusType = 'all' | 'completed' | 'active' | 'three-tasks';

export type ToDoListType = {
    id: string;
    title: string;
    filter: FilterStatusType;
};

export type Todolist = {
    id: string;
    title: string;
    addedDate: string;
    order: number;
};

