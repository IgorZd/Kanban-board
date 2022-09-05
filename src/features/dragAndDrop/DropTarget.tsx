import React, { ReactNode } from "react";
// @ts-ignore
import styled from "@xstyled/styled-components";
import { TaskState } from "../../app/state/boardInterfaces";

const Wrapper = styled.div`
  width: 100%;
  height: calc(100% + 120px);
  &.overed {
    & > li > ul > li {
      border-color: ${(props: any) => props.theme.colors.gray1};
      box-shadow: 0px 2px 8px rgba(40, 41, 61, 0.08),
        0px 20px 32px rgba(96, 97, 112, 0.24);
      & > span {
        color: ${(props: any) => props.theme.colors.gray1};
      }
      & > svg > path {
        stroke: ${(props: any) => props.theme.colors.gray1};
      }
    }
  }
`;

export const DropTarget = ({
  children,
  onItemDropped,
  dropEffect,
  ...props
}: {
  children: ReactNode;
  onItemDropped: (task: TaskState) => void;
  dropEffect: string;
  className?: string;
}) => {
  const [isOver, setIsOver] = React.useState(false);

  const dragOver = (e: any) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = dropEffect;
  };

  const drop = (e: any) => {
    const droppedItem = JSON.parse(e.dataTransfer.getData("drag-item"));
    if (droppedItem) {
      onItemDropped(droppedItem);
    }
    setIsOver(false);
  };

  const dragEnter = (e: any) => {
    e.dataTransfer.dropEffect = dropEffect;
    setIsOver(true);
  };

  const dragLeave = () => setIsOver(false);

  return (
    <Wrapper
      onDragOver={dragOver}
      onDrop={drop}
      onDragEnter={dragEnter}
      onDragLeave={dragLeave}
      className={isOver ? "overed" : ""}
      {...props}
    >
      {children}
    </Wrapper>
  );
};
