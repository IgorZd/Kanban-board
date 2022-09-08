import React, { useEffect, useState } from "react";
// @ts-ignore
import styled from "@xstyled/styled-components";
import { BoardItem } from "../boardItem/BoardItem";
import { useDispatch, useSelector } from "react-redux";
import {
  startCreatingProcess,
  replaceItemInBoard,
  selectBoardData,
  setIsEditInProcessTask,
} from "../../app/state/boardSlice";
import { BoardItemState, TaskState } from "../../app/state/boardInterfaces";
import { DropTarget } from "../../features/dragAndDrop/DropTarget";
import { replaceTask, useGetKanbanBoard } from "../../api/kanbanBoard";
import { useNotifierFunctions } from "../../features/notifier";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;
const Title = styled.h1`
  font-size: 30px;
  font-weight: bold;
  margin: 0 0 32px 32px;
  color: ${(props: any) => props.theme.colors.black};
`;
const ItemsWrapper = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
`;
const StyledDropTarget = styled(DropTarget)`
  display: flex;
  justify-content: ${(props: any) => props.justifyContent};
`;

export const Board = () => {
  const dispatch = useDispatch();
  useGetKanbanBoard();
  const data = useSelector(selectBoardData);
  const [idOfHomeItem, setIdOfHomeItem] = useState<string>();
  const [isEditingAvailable, setIsEditingAvailable] = useState(true);
  const countNotEditingTasks = (tasks: TaskState[]) => {
    return tasks.filter((task: TaskState) => !task.isEditingInProcess).length;
  };
  const tasksFromTodo = data[0].tasksList;
  const tasksFromInProgress = data[1].tasksList;
  const tasksFromDone = data[2].tasksList;
  const generalNumberOfTasks =
    tasksFromTodo.length + tasksFromInProgress.length + tasksFromDone.length;

  const notEditingNumberOfTasksFromTodo = countNotEditingTasks(
    data[0].tasksList
  );
  const notEditingNumberOfTasksInProgress = countNotEditingTasks(
    data[1].tasksList
  );
  const notEditingNumberOfTasksFromDone = countNotEditingTasks(
    data[2].tasksList
  );
  const generalNumberOfEditingTasks =
    notEditingNumberOfTasksFromTodo +
    notEditingNumberOfTasksInProgress +
    notEditingNumberOfTasksFromDone;
  const { addNotification } = useNotifierFunctions();

  const handleDropItem = (task: TaskState, idOfTargetItem: string) => {
    dispatch(replaceItemInBoard({ idOfHomeItem, idOfTargetItem, task }));
    if (idOfHomeItem && idOfTargetItem && task.id) {
      replaceTask(idOfHomeItem, idOfTargetItem, task.id, addNotification);
    }
  };
  const handleCreateNewTask = (idOfBoardItem: string) => {
    if (isEditingAvailable) {
      dispatch(startCreatingProcess({ idOfBoardItem }));
    }
  };
  const handleSetIsEditInProcessTask = (
    idOfBoardItem: string,
    taskId: string,
    value: boolean
  ) => {
    dispatch(setIsEditInProcessTask({ idOfBoardItem, taskId, value }));
  };

  useEffect(() => {
    if (generalNumberOfTasks === generalNumberOfEditingTasks) {
      setIsEditingAvailable(true);
    } else {
      setIsEditingAvailable(false);
    }
  }, [generalNumberOfTasks, generalNumberOfEditingTasks]);

  return (
    <Wrapper>
      <Title>Kanban Board</Title>
      <ItemsWrapper>
        {data.map((item: BoardItemState, index: number) => {
          const { id } = item;
          return (
            <StyledDropTarget
              key={index}
              onItemDropped={(task: TaskState) => {
                handleDropItem(task, id);
              }}
              dropEffect={"moveAll"}
              justifyContent={
                index === 1 ? "center" : index === 2 ? "flex-end" : "flex-start"
              }
            >
              <BoardItem
                data={item}
                addItemOnClick={() => {
                  handleCreateNewTask(id);
                }}
                setIdOfHomeItem={() => {
                  setIdOfHomeItem(id);
                }}
                setIsEditInProcessTask={(taskId: string, value: boolean) => {
                  handleSetIsEditInProcessTask(id, taskId, value);
                }}
                isEditingAvailable={isEditingAvailable}
              />
            </StyledDropTarget>
          );
        })}
      </ItemsWrapper>
    </Wrapper>
  );
};
