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
  }) => void
) => {
  axios
    .post(`${API_URL}/kanbanBoard/${columnId}/task`, data)
    .then((res) => {
      const { data } = res;
      createLocalTask(data);
    })
    .catch((e) => {
      console.log("e: ", e);
    });
};

export const removeTask = (columnId: string, taskId: string) => {
  axios
    .delete(`${API_URL}/kanbanBoard/${columnId}/${taskId}`)
    .then((res) => {
      const { data } = res;
      console.log("data: ", data);
    })
    .catch((e) => console.log("e: ", e));
};

export const updateTask = (
  columnId: string,
  taskId: string,
  data: { author: string; description: string }
) => {
  axios
    .put(`${API_URL}/kanbanBoard/${columnId}/${taskId}`, data)
    .then((res) => {
      const { data } = res;
      console.log("data: ", data);
    })
    .catch((e) => console.log("e: ", e));
};
