export interface TaskState {
  id: string;
  description: string;
  author: string;
  isEditingInProcess: boolean;
}

export interface BoardItemState {
  id: string;
  title: string;
  tasksList: TaskState[];
}

export interface BoardState {
  data: BoardItemState[];
}
