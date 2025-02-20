import { useEffect, useState } from "react";
import { defaultBoard } from "@/mock/mockData";
import { PlusIcon } from "@heroicons/react/24/outline";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { addBoard, updateTask, onDragEnd } from "@/hooks/useBoardActions";
import { BoardProps } from "@/types/types";
import { BoardHeader } from "@/components/BoardHeader";
import { TaskDescription } from "@/components/TaskDescription";

export default function Home() {
  const [boards, setBoards] = useState<BoardProps[]>([]);
  const [editTaskId, setEditTaskId] = useState("");
  const [editBoardId, setEditBoardId] = useState("");

  useEffect(() => {
    const storedBoards = JSON.parse(localStorage.getItem("boards") || "null");

    if (!storedBoards || storedBoards.length === 0) {
      setBoards([...defaultBoard]);
      localStorage.setItem("boards", JSON.stringify(defaultBoard));
      setBoards(defaultBoard);
    } else {
      setBoards(storedBoards);
    }
  }, []);

  useEffect(() => {
    if (boards.length > 0) {
      localStorage.setItem("boards", JSON.stringify(boards));
    }
  }, [boards]);

  return (
    <div className="h-screen flex flex-col">
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, boards, setBoards)}
      >
        <Droppable droppableId="boards" direction="horizontal" type="board">
          {(provided) => (
            <div
              className="flex flex-wrap gap-5 m-5 border-2 border-solid border-blue p-3 items-start
                      "
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {boards.map((board, index) => (
                <Draggable key={board.id} draggableId={board.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="min-w-[171px] overflow-hidden flex flex-col border-2 border-black w-[32%] p-3 bg-white shadow-md"
                    >
                      <BoardHeader
                        editBoardId={editBoardId}
                        board={board}
                        boards={boards}
                        setEditBoardId={setEditBoardId}
                        setBoards={setBoards}
                      />
                      <Droppable droppableId={board.id} type="task">
                        {(provided) => (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                          >
                            {board.task.map((task, index) => (
                              <Draggable
                                key={task.id}
                                draggableId={task.id}
                                index={index}
                              >
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="flex flex-row justify-between p-2 border rounded bg-white mb-2 cursor-pointer"
                                  >
                                    {editTaskId === task.id ? (
                                      <input
                                        type="text"
                                        value={task.description}
                                        onChange={(e) =>
                                          updateTask(
                                            board.id,
                                            task.id,
                                            e.target.value,
                                            boards,
                                            setBoards
                                          )
                                        }
                                        placeholder="입력..."
                                        className="border p-1 flex-grow"
                                        onBlur={() => setEditTaskId("")}
                                        autoFocus
                                      />
                                    ) : (
                                      <TaskDescription
                                        boards={boards}
                                        setBoards={setBoards}
                                        task={task}
                                        setEditTaskId={setEditTaskId}
                                      />
                                    )}
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </div>
                  )}
                </Draggable>
              ))}
              <button
                className="bg-gray-200 w-[100px] h-[100px] flex items-center justify-center text-white"
                onClick={() => addBoard(boards, setBoards)}
              >
                <PlusIcon className="text-black w-10 h-10" />
              </button>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}
