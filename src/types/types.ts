export interface InputProps {
  text: string;
  setText: (text: string) => void;
  setIsEdit: (isEdit: boolean) => void;
}

export interface BoardProps {
  id: string;
  title: string;
  task: Task[];
}

export interface Task {
  id: string;
  description: string;
}
