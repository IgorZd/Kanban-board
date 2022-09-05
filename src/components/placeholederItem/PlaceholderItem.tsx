import React from "react";
// @ts-ignore
import styled from "@xstyled/styled-components";
import { ReactComponent as AddIcon } from "../../assets/add_icon.svg";

const Wrapper = styled.li`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border: 1px solid;
  border-color: ${(props: any) => props.theme.colors.gray2};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s linear;
  &:hover {
    border-color: ${(props: any) => props.theme.colors.gray1};
    box-shadow: 0px 0px 1px rgba(40, 41, 61, 0.04),
      0px 2px 4px rgba(96, 97, 112, 0.16);
    & > span {
      color: ${(props: any) => props.theme.colors.gray1};
    }
    & > svg > path {
      stroke: ${(props: any) => props.theme.colors.gray1};
    }
  }
`;
const Label = styled.span`
  font-size: 14px;
  color: ${(props: any) => props.theme.colors.gray2};
  font-weight: 600;
  transition: all 0.3s linear;
`;
const Icon = styled(AddIcon)`
  width: 14px;
  height: 14px;
  margin-right: 4px;
  & > path {
    transition: all 0.3s linear;
  }
`;

export const PlaceholderItem = ({ onClick }: { onClick: () => void }) => {
  return (
    <Wrapper onClick={onClick}>
      <Icon />
      <Label>Add new item</Label>
    </Wrapper>
  );
};
