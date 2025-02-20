import { PencilIcon, TrashIcon } from "@heroicons/react/24/outline";
import IconButton from "./IconButton";
import { deleteTask } from "@/hooks/useBoardActions";
import { BoardProps, Task } from "@/types/types";

interface TaskDescriptionProps {
  task: Task;
  boards: BoardProps[];
  setEditTaskId: React.Dispatch<React.SetStateAction<string>>;
  setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>;
}

export const TaskDescription = ({
  task,
  boards,
  setBoards,
  setEditTaskId,
}: TaskDescriptionProps) => {
  const handleTaskEdit = (taskId: string) => {
    setEditTaskId((prev) => (prev === taskId ? "" : taskId));
  };

  return (
    <>
      <p className="flex-grow">{task.description}</p>
      <div className="flex gap-2">
        <IconButton
          onClick={() => handleTaskEdit(task.id)}
          icon={<PencilIcon />}
        />
        <IconButton
          onClick={() => deleteTask(task.id, boards, setBoards)}
          icon={<TrashIcon />}
        />
      </div>
    </>
  );
};
