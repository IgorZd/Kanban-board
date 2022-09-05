import React from "react";
// @ts-ignore
import styled from "@xstyled/styled-components";
import { ReactComponent as AddIcon } from "../../assets/add_icon.svg";

const Wrapper = styled.button`
  display: flex;
  background-color: transparent;
  border: none;
  cursor: pointer;

  & > svg {
    width: 16px;
    height: 16px;
    & > path {
      stroke: ${(props: any) => props.theme.colors.gray2};
      transition: all 0.3s linear;
    }
  }
  &:hover > svg > path {
    stroke: ${(props: any) => props.theme.colors.gray1};
    transition: all 0.3s linear;
  }
`;

export const AddButton = ({
  onClick,
  ...props
}: {
  onClick: () => void;
  className?: string;
}) => {
  return (
    <Wrapper onClick={onClick} {...props}>
      <AddIcon />
    </Wrapper>
  );
};
