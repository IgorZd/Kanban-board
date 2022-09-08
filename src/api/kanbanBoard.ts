import { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../consts";
import { useDispatch } from "react-redux";
import { setBoard } from "../app/state/boardSlice";

export const useGetKanbanBoard = () => {
  const [localData, setLocalData] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get(`${API_URL}/kanbanBoard`).then((res) => {
      const { data } = res;
      dispatch(setBoard({ data }));
      setLocalData(data);
    });
  }, [dispatch]);
  return localData;
};

export const createTask = (
  columnId: string,
  data: { author: string; description: string },
  createLocalTask: (data: {
    id: string;
    author: string;
    description: string;
  }) => void,
  addNotification: any
) => {
  axios
    .post(`${API_URL}/kanbanBoard/${columnId}/task`, data)
    .then((res) => {
      const { data } = res;
      createLocalTask(data);
      addNotification({
        message: "The task is successfully created!",
        type: "success",
      });
    })
    .catch((e) => {
      addNotification({
        message: "Something went wrong...",
        type: "error",
      });
    });
};

export const removeTask = (
  columnId: string,
  taskId: string,
  addNotification: any
) => {
  axios
    .delete(`${API_URL}/kanbanBoard/${columnId}/${taskId}`)
    .then((res) => {
      addNotification({
        message: "The task is successfully removed!",
        type: "success",
      });
    })
    .catch((e) =>
      addNotification({
        message: "Something went wrong...",
        type: "error",
      })
    );
};

export const updateTask = (
  columnId: string,
  taskId: string,
  data: { author: string; description: string },
  addNotification: any
) => {
  axios
    .put(`${API_URL}/kanbanBoard/${columnId}/${taskId}`, data)
    .then((res) => {
      addNotification({
        message: "The task is successfully updated!",
        type: "success",
      });
    })
    .catch((e) =>
      addNotification({
        message: "Something went wrong...",
        type: "error",
      })
    );
};

export const replaceTask = (
  homeColumnId: string,
  targetColumnId: string,
  taskId: string,
  addNotification: any
) => {
  axios
    .post(
      `${API_URL}/kanbanBoard/from/${homeColumnId}/to/${targetColumnId}/replace/${taskId}`
    )
    .then((res) => {
      addNotification({
        message: "The task is successfully replaced!",
        type: "success",
      });
    })
    .catch((e) => {
      addNotification({
        message: "Something went wrong...",
        type: "error",
      });
    });
};
