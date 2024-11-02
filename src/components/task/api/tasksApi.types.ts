import { TaskPriority, TaskStatus } from "../../../common/enums/enums";

export type TasksStateType = {
  [key: string]: DomainTask[];
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
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskModel = {
  status: TaskStatus;
  title: string;
  deadline: string;
  description: string;
  priority: number;
  startDate: string;
};

export type UpdateTaskDomainModel = Partial<UpdateTaskModel>;
