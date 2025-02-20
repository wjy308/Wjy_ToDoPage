import { BoardProps } from "@/types/types";
import { v4 as uuidv4 } from "uuid";

export const defaultBoard: BoardProps[] = [
  {
    id: uuidv4(),
    title: "Not Start",
    task: [{ id: uuidv4(), description: "아직 시작하지 않은 작업들" }],
  },
  {
    id: uuidv4(),
    title: "In Progress",
    task: [{ id: uuidv4(), description: "하고 있는 작업들" }],
  },
  {
    id: uuidv4(),
    title: "Done",
    task: [{ id: uuidv4(), description: "끝난 작업들" }],
  },
];
