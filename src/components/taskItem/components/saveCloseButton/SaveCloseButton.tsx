import React from "react";
// @ts-ignore
import styled from "@xstyled/styled-components";
const Button = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  & > svg > path {
    stroke: ${(props: any) => props.color};
    transition: all 0.3s linear;
  }
  &:hover > svg > path {
    stroke: ${(props: any) => props.hoverColor};
    transition: all 0.3s linear;
  }
`;

export const SaveCloseButton = ({
  onClick,
  icon,
  color,
  hoverColor,
}: {
  onClick: () => void;
  icon: () => void;
  color: string;
  hoverColor: string;
}) => {
  return (
    <Button onClick={onClick} color={color} hoverColor={hoverColor}>
      {icon()}
    </Button>
  );
};
