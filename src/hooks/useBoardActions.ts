import { v4 as uuidv4 } from "uuid";
import { BoardProps } from "@/types/types";
import { DropResult } from "@hello-pangea/dnd";
// 보드 추가
export const addBoard = (
  boards: BoardProps[],
  setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>
) => {
  const newBoard = { id: uuidv4(), title: "New Board", task: [] };
  setBoards((prevBoards) => [...prevBoards, newBoard]);
};

// 작업 추가
export const addTask = (
  boardId: string,
  boards: BoardProps[],
  setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>
) => {
  setBoards((prevBoards) =>
    prevBoards.map((board) =>
      board.id === boardId
        ? { ...board, task: [...board.task, { id: uuidv4(), description: "" }] }
        : board
    )
  );
  return boardId; // 추가된 작업의 ID 반환
};

// 작업 변경
export const updateTask = (
  boardId: string,
  taskId: string,
  value: string,
  boards: BoardProps[],
  setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>
) => {
  setBoards((prevBoards) =>
    prevBoards.map((board) =>
      board.id === boardId
        ? {
            ...board,
            task: board.task.map((task) =>
              task.id === taskId ? { ...task, description: value } : task
            ),
          }
        : board
    )
  );
};

// 작업 삭제
export const deleteTask = (
  taskId: string,
  boards: BoardProps[],
  setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>
) => {
  setBoards((prevBoards) =>
    prevBoards.map((board) => ({
      ...board,
      task: board.task.filter((task) => task.id !== taskId),
    }))
  );
};

// 보드 삭제
export const deleteBoard = (
  boardId: string,
  boards: BoardProps[],
  setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>
) => {
  setBoards((prevBoards) => prevBoards.filter((board) => board.id !== boardId));
};

// 드래그 완료 처리
export const onDragEnd = (
  result: DropResult,
  boards: BoardProps[],
  setBoards: React.Dispatch<React.SetStateAction<BoardProps[]>>
) => {
  const { source, destination, draggableId, type } = result;

  if (!destination) return;

  setBoards((prevBoards) => {
    const updatedBoards = [...prevBoards];

    if (type === "board") {
      // 보드 이동 로직
      const [movedBoard] = updatedBoards.splice(source.index, 1);
      updatedBoards.splice(destination.index, 0, movedBoard);
    } else if (type === "task") {
      // 태스크 이동 로직
      const sourceBoardIndex = updatedBoards.findIndex(
        (b) => b.id === source.droppableId
      );
      const destinationBoardIndex = updatedBoards.findIndex(
        (b) => b.id === destination.droppableId
      );

      if (sourceBoardIndex === -1 || destinationBoardIndex === -1)
        return prevBoards;

      const sourceBoard = updatedBoards[sourceBoardIndex];
      const destinationBoard = updatedBoards[destinationBoardIndex];

      // 이동할 태스크 찾기
      const taskIndex = sourceBoard.task.findIndex(
        (task) => task.id === draggableId
      );
      if (taskIndex === -1) return prevBoards;

      const [movedTask] = sourceBoard.task.splice(taskIndex, 1); // 원래 보드에서 제거

      destinationBoard.task.splice(destination.index, 0, movedTask); // 새 보드에 추가
    }

    return updatedBoards;
  });
};
