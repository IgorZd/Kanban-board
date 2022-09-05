import React from "react";
// @ts-ignore
import styled from "@xstyled/styled-components";

import { AddButton } from "../addButton/AddButton";
import { PlaceholderItem } from "../placeholederItem/PlaceholderItem";
import { BoardItemState, TaskState } from "../../app/state/boardInterfaces";
import { TaskItem } from "../taskItem/TaskItem";

const Wrapper = styled.li`
  width: 100%;
  box-sizing: border-box;
  max-width: 500px;
  max-height: 746px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 0 32px 50px 32px;
`;
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
const Title = styled.h2`
  font-size: 16px;
  font-weight: bold;
  &.todo {
    color: ${(props: any) => props.theme.colors.gray2};
  }
  &.in-progress {
    color: ${(props: any) => props.theme.colors.blue1};
  }
  &.done {
    color: ${(props: any) => props.theme.colors.green};
  }
`;
const TasksList = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 1;
`;

export const BoardItem = ({
  data,
  addItemOnClick,
  setIdOfHomeItem,
  setIsEditInProcessTask,
  isEditingAvailable,
}: {
  data: BoardItemState;
  addItemOnClick: () => void;
  setIdOfHomeItem: () => void;
  setIsEditInProcessTask: (taskId: string, value: boolean) => void;
  isEditingAvailable: boolean;
}) => {
  const { id, title, tasksList } = data;

  return (
    <Wrapper>
      <TitleWrapper>
        <Title
          className={
            id === "0"
              ? "todo"
              : id === "1"
              ? "in-progress"
              : id === "2"
              ? "done"
              : ""
          }
        >{`${title} ${tasksList.length}`}</Title>
        <AddButton onClick={addItemOnClick} />
      </TitleWrapper>
      <TasksList>
        {tasksList.map((task: TaskState, index: number) => {
          return (
            <TaskItem
              key={index}
              data={task}
              boardItemId={id}
              setIdOfHomeItem={setIdOfHomeItem}
              setIsEditInProcess={(value: boolean) => {
                setIsEditInProcessTask(task.id, value);
              }}
              isEditingAvailable={isEditingAvailable}
            />
          );
        })}
        <PlaceholderItem onClick={addItemOnClick} />
      </TasksList>
    </Wrapper>
  );
};
