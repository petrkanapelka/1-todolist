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

export type ApiResponse<T> = {
    data: {
        item: T;
    };
    messages: string[];
    fieldsErrors: string[];
    resultCode: number;
};

export enum RESULT_CODE {
    COMPLETED = 2,
    ACTIVE = 0,
}