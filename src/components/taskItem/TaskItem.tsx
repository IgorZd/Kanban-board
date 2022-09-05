import React, { useEffect, useMemo, useState } from "react";
// @ts-ignore
import styled from "@xstyled/styled-components";
import { TaskState } from "../../app/state/boardInterfaces";
import { Drag } from "../../features/dragAndDrop/Drag";
import { Menu } from "./components/menu/Menu";
import { Description } from "./components/description/Description";
import { useDispatch } from "react-redux";
import {
  deleteTask,
  setTaskAuthorValue,
  setTaskDescriptionValue,
} from "../../app/state/boardSlice";
import { Author } from "./components/author/Author";

const Wrapper = styled.li`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  padding: 16px;
  list-style: none;
  background-color: ${(props: any) =>
    props.isDraggableInProcess
      ? props.backgroundColor
      : props.theme.colors.white};
  border-radius: 8px;
  margin-bottom: 32px;
  cursor: pointer;
  &.editing {
    box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
      0px 20px 32px rgba(96, 97, 112, 0.24);
  }
`;
const Marker = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${(props: any) =>
    props.boardItemId === "1"
      ? props.theme.colors.blue1
      : props.boardItemId === "2"
      ? props.theme.colors.green
      : props.theme.colors.gray2};
  border-radius: 50%;
  margin-right: 12px;
`;
const InfoContainer = styled.div`
  width: calc(100% - 44px);
  display: flex;
  flex-direction: column;
`;
const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;
const AuthorWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Text = styled.span`
  font-size: 12px;
  color: ${(props: any) => props.theme.colors.black};
`;

export const TaskItem = ({
  data,
  boardItemId,
  setIdOfHomeItem,
  setIsEditInProcess,
  isEditingAvailable,
}: {
  data: TaskState;
  boardItemId: string;
  setIdOfHomeItem: () => void;
  setIsEditInProcess: (value: boolean) => void;
  isEditingAvailable: boolean;
}) => {
  const dispatch = useDispatch();
  const { id, description, author, isEditingInProcess } = data;
  const [isDraggableInProcess, setIsDraggableInProcess] = useState(false);
  const [localValues, setLocalValues] = useState({ description, author });
  const [savedValues, setSavedValues] = useState({ description, author });

  const handleDescriptionOnChange = (value: string) => {
    setLocalValues({ ...localValues, description: value });
  };
  const handleAuthorOnChange = (value: string) => {
    setLocalValues({ ...localValues, author: value });
  };
  const editOnClick = () => {
    setSavedValues({
      author: localValues.author,
      description: localValues.description,
    });
    setIsEditInProcess(true);
  };
  const saveOnClick = () => {
    if (localValues.description.length > 2 && localValues.author.length > 2) {
      setIsEditInProcess(false);
      dispatch(
        setTaskDescriptionValue({
          idOfBoardItem: boardItemId,
          taskId: id,
          value: localValues.description,
        })
      );
      dispatch(
        setTaskAuthorValue({
          idOfBoardItem: boardItemId,
          taskId: id,
          value: localValues.author,
        })
      );
    }
  };
  const deleteOnClick = () => {
    setIsEditInProcess(false);
    dispatch(deleteTask({ idOfBoardItem: boardItemId, id }));
  };
  const cancellOnClick = () => {
    if (
      savedValues.author.length === 0 &&
      savedValues.description.length === 0
    ) {
      deleteOnClick();
    } else {
      setLocalValues({
        author: savedValues.author,
        description: savedValues.description,
      });
      setIsEditInProcess(false);
    }
  };

  const randomRGBA = useMemo(() => {
    var o = Math.round,
      r = Math.random,
      s = 255;
    return (
      "rgba(" +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      o(r() * s) +
      "," +
      "0.3" +
      ")"
    );
  }, []);

  useEffect(() => {
    setLocalValues({ author, description });
  }, [author, description]);

  return (
    <Drag
      dataItem={data}
      dropEffect={"moveAll"}
      setIdOfHomeItem={setIdOfHomeItem}
      isDraggableInProcess={isDraggableInProcess}
      setIsDraggableInProcess={setIsDraggableInProcess}
    >
      <Wrapper
        isDraggableInProcess={isDraggableInProcess}
        backgroundColor={randomRGBA}
        className={isEditingInProcess ? "editing" : ""}
      >
        <Marker boardItemId={boardItemId} />
        <InfoContainer>
          <TitleWrapper>
            <Description
              value={localValues.description}
              onChange={handleDescriptionOnChange}
              isEdinInProcess={isEditingInProcess}
            />
            <Menu
              isEditingInProcess={isEditingInProcess}
              editOnClick={editOnClick}
              saveOnClick={saveOnClick}
              cancellOnClick={cancellOnClick}
              deleteOnClick={deleteOnClick}
              isEditingAvailable={isEditingAvailable}
            />
          </TitleWrapper>
          <AuthorWrapper>
            <Author
              value={localValues.author}
              onChange={handleAuthorOnChange}
              isEdinInProcess={isEditingInProcess}
              authorBackgroundColor={randomRGBA}
            />
            <Text>{`id: ${id}`}</Text>
          </AuthorWrapper>
        </InfoContainer>
      </Wrapper>
    </Drag>
  );
};
