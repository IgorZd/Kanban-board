import React from "react";
// @ts-ignore
import styled, { useTheme } from "@xstyled/styled-components";
import { ReactComponent as EditIcon } from "../../../../assets/edit.svg";
import { ReactComponent as DeleteIcon } from "../../../../assets/delete.svg";

const PopUp = styled.div`
  box-sizing: border-box;
  border: 1px solid;
  border-color: ${(props: any) => props.theme.colors.gray5};
  border-radius: 8px;
  position: absolute;
  background-color: white;
  right: 0;
`;
const ActionWrapper = styled.div`
  padding: 6px 10px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  &:hover > span {
    transition: all 0.3s linear;
    font-weight: 600;
  }

  &.first {
    border-bottom: 1px solid;
    border-color: ${(props: any) => props.theme.colors.gray5};
  }
`;
const Label = styled.span`
  font-size: 14px;
  margin-left: 4px;
  font-weight: 500;
  color: ${(props: any) => props.color};
  transition: all 0.3s linear;
`;

export const MenuPopup = ({
  editOnClick,
  deleteOnClick,
  popupRef,
}: {
  editOnClick: () => void;
  deleteOnClick: () => void;
  popupRef: React.MutableRefObject<any>;
}) => {
  const theme = useTheme();
  const { red3, black } = theme.colors;
  const popUpArr = [
    { label: "Edit", icon: () => <EditIcon />, onClick: editOnClick },
    { label: "Delete", icon: () => <DeleteIcon />, onClick: deleteOnClick },
  ];

  return (
    <PopUp ref={popupRef}>
      {popUpArr.map((item: any, index: number) => {
        const { label, icon, onClick } = item;
        return (
          <ActionWrapper
            key={index}
            onClick={onClick}
            className={index === 0 ? "first" : ""}
          >
            {icon()}
            <Label color={index === 0 ? black : red3}>{label}</Label>
          </ActionWrapper>
        );
      })}
    </PopUp>
  );
};
