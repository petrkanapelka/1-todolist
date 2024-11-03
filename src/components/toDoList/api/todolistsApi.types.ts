import { RequestStatus } from "modules/app-reducer";

export type FilterStatusType = "all" | "completed" | "active" | "three-tasks";

export type Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};

export type DomainTodolist = Todolist & {
  filter: FilterStatusType;
  entityStatus: RequestStatus;
};

export type UpdateDomainTodolist = Partial<DomainTodolist>;
