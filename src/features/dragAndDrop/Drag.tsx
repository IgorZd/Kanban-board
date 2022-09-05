import React, { ReactNode } from "react";

const draggingStyle = {
  opacity: 0.7,
};

export const Drag = ({
  children,
  dataItem,
  dropEffect,
  setIdOfHomeItem,
  isDraggableInProcess,
  setIsDraggableInProcess,
}: {
  children: ReactNode;
  dataItem: any;
  dropEffect: string;
  setIdOfHomeItem: () => void;
  isDraggableInProcess: boolean;
  setIsDraggableInProcess: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const startDrag = (e: any) => {
    setIsDraggableInProcess(true);
    setIdOfHomeItem();
    if (dataItem) {
      e.dataTransfer.setData("drag-item", JSON.stringify(dataItem));
      e.dataTransfer.effectAllowed = dropEffect;
    }
  };

  const dragEnd = () => setIsDraggableInProcess(false);

  return (
    <div
      style={isDraggableInProcess ? draggingStyle : {}}
      draggable
      onDragStart={startDrag}
      onDragEnd={dragEnd}
    >
      {children}
    </div>
  );
};
