import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NEW_ID } from "../../consts";
import { RootState } from "../store";
import { BoardItemState, BoardState, TaskState } from "./boardInterfaces";

const initialState: BoardState = {
  data: [
    {
      id: "0",
      title: "TODO",
      tasksList: [
        {
          id: "2",
          description: "Description 3",
          author: "Author 3",
          isEditingInProcess: false,
        },
        {
          id: "3",
          description: "Description 4",
          author: "Author 4",
          isEditingInProcess: false,
        },
        {
          id: "4",
          description: "Description 5",
          author: "Author 5",
          isEditingInProcess: false,
        },
      ],
    },
    {
      id: "1",
      title: "In progress",
      tasksList: [
        {
          id: "1",
          description: "Description 2",
          author: "Author 2",
          isEditingInProcess: false,
        },
      ],
    },
    {
      id: "2",
      title: "Done",
      tasksList: [
        {
          id: "0",
          description: "Description 1",
          author: "Author 1",
          isEditingInProcess: false,
        },
      ],
    },
  ],
};

export const boardrSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setBoard: (state, action: PayloadAction<any>) => {
      state.data = action.payload.data;
    },
    replaceItemInBoard: (state, action: PayloadAction<any>) => {
      const indexOfHomeItem = state.data.findIndex(
        (item: BoardItemState) => item.id === action.payload.idOfHomeItem
      );
      const indexOfTargetItem = state.data.findIndex(
        (item: BoardItemState) => item.id === action.payload.idOfTargetItem
      );
      state.data[indexOfHomeItem].tasksList = state.data[
        indexOfHomeItem
      ].tasksList.filter(
        (task: TaskState) => task.id !== action.payload.task.id
      );
      state.data[indexOfTargetItem].tasksList = [
        ...state.data[indexOfTargetItem].tasksList,
        action.payload.task,
      ];
    },
    startCreatingProcess: (state, action: PayloadAction<any>) => {
      const indexOfBoardItem = state.data.findIndex(
        (item: BoardItemState) => item.id === action.payload.idOfBoardItem
      );
      state.data[indexOfBoardItem].tasksList.push({
        id: NEW_ID,
        description: "",
        author: "",
        isEditingInProcess: true,
      });
    },
    handleCreateTask: (state, action: PayloadAction<any>) => {
      const indexOfBoardItem = state.data.findIndex(
        (item: BoardItemState) => item.id === action.payload.boardItemId
      );
      const indexOfTask = state.data[indexOfBoardItem].tasksList.findIndex(
        (task: TaskState) => task.id === NEW_ID
      );
      const { id, author, description } = action.payload.data;
      state.data[indexOfBoardItem].tasksList[indexOfTask] = {
        ...state.data[indexOfBoardItem].tasksList[indexOfTask],
        id,
        author,
        description,
      };
    },
    setTask: (state, action: PayloadAction<any>) => {
      const indexOfBoardItem = state.data.findIndex(
        (item: BoardItemState) => item.id === action.payload.idOfBoardItem
      );
      const indexOfTask = state.data[indexOfBoardItem].tasksList.findIndex(
        (task: TaskState) => task.id === action.payload.taskId
      );

      state.data[indexOfBoardItem].tasksList[indexOfTask] = {
        ...state.data[indexOfBoardItem].tasksList[indexOfTask],
        author: action.payload.author,
        description: action.payload.description,
      };
    },
    setIsEditInProcessTask: (state, action: PayloadAction<any>) => {
      const indexOfBoardItem = state.data.findIndex(
        (item: BoardItemState) => item.id === action.payload.idOfBoardItem
      );
      const indexOfTask = state.data[indexOfBoardItem].tasksList.findIndex(
        (task: TaskState) => task.id === action.payload.taskId
      );
      state.data[indexOfBoardItem].tasksList[indexOfTask].isEditingInProcess =
        action.payload.value;
    },
    deleteTask: (state, action: PayloadAction<any>) => {
      const indexOfBoardItem = state.data.findIndex(
        (item: BoardItemState) => item.id === action.payload.idOfBoardItem
      );
      state.data[indexOfBoardItem].tasksList = state.data[
        indexOfBoardItem
      ].tasksList.filter((task: TaskState) => task.id !== action.payload.id);
    },
  },
});

export const {
  setBoard,
  replaceItemInBoard,
  startCreatingProcess,
  setIsEditInProcessTask,
  deleteTask,
  setTask,
  handleCreateTask,
} = boardrSlice.actions;

export const selectBoardData = (state: RootState) => {
  return state.board.data;
};

export default boardrSlice.reducer;
