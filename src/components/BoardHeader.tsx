import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { addTask, deleteBoard } from "@/hooks/useBoardActions";
import { BoardProps } from "@/types/types";
import IconButton from "./IconButton";

interface BoardHeaderProps {
  editBoardId: string;
  board: BoardProps;
  boards: BoardProps[];
  setEditBoardId: React.Dispatch<React.SetStateAction<string>>;
  setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>;
}

export const BoardHeader: React.FC<BoardHeaderProps> = ({
  editBoardId,
  board,
  boards,
  setEditBoardId,
  setBoards,
}) => {
  const handleEditBoard = (boardId: string) => {
    setEditBoardId(boardId);
  };

  const handleBoardTitleChange = (boardId: string, value: string) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId ? { ...board, title: value } : board
      )
    );
  };

  const handleBlurBoardTitle = () => {
    setEditBoardId("");
  };

  return (
    <div className="flex flex-row justify-between items-center mb-2 ">
      {editBoardId === board.id ? (
        <input
          type="text"
          value={board.title}
          onChange={(e) => handleBoardTitleChange(board.id, e.target.value)}
          className="border p-1 flex-grow"
          onBlur={handleBlurBoardTitle}
          autoFocus
        />
      ) : (
        <p>{board.title}</p>
      )}
      <div className="flex items-center justify-center gap-2 p-2">
        <IconButton
          onClick={() => addTask(board.id, boards, setBoards)}
          icon={<PlusIcon />}
        />
        <IconButton
          onClick={() => handleEditBoard(board.id)}
          icon={<PencilIcon />}
        ></IconButton>

        <IconButton
          onClick={() => deleteBoard(board.id, boards, setBoards)}
          icon={<TrashIcon />}
        />
      </div>
    </div>
  );
};
