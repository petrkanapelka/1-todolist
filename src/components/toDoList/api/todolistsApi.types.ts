export type FilterStatusType = "all" | "completed" | "active" | "three-tasks";

export type Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type DomainTodolist = Todolist & {
  filter: FilterStatusType;
};
