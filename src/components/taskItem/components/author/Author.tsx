import React from "react";
// @ts-ignore
import styled from "@xstyled/styled-components";
import { Input } from "../description/Description";

const AuthorItem = styled.span`
  background-color: ${(props: any) => props.backgroundColor};
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 8px;
  font-weight: 600;
  color: ${(props: any) => props.theme.colors.black};
`;
const StyledTextarea = styled(Input)`
  margin: 0;
`;

export const Author = ({
  value,
  isEdinInProcess,
  onChange,
  authorBackgroundColor,
}: {
  value: string;
  isEdinInProcess: boolean;
  onChange: (value: string) => void;
  authorBackgroundColor: string;
}) => {
  return (
    <>
      {isEdinInProcess ? (
        <StyledTextarea
          maxRows={1}
          value={value}
          onChange={(e: any) => {
            onChange(e.target.value);
          }}
          placeholder={"Enter author"}
        />
      ) : (
        <AuthorItem backgroundColor={authorBackgroundColor}>{value}</AuthorItem>
      )}
    </>
  );
};
