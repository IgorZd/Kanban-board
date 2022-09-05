import React from "react";
import TextareaAutosize from "react-textarea-autosize";
// @ts-ignore
import styled from "@xstyled/styled-components";

const Title = styled.h3`
  width: calc(100% - 64px);
  font-size: 14px;
  margin-bottom: 12px;
  color: ${(props: any) => props.theme.colors.black};
`;
export const Input = styled(TextareaAutosize)`
  width: calc(100% - 76px);
  font-size: 14px;
  font-family: "Nunito Sans", sans-serif;
  border: none;
  outline: none;
  resize: none;
  padding: 2px 6px;
  border: 1px solid;
  border-radius: 8px;
  border-color: ${(props: any) => props.theme.colors.gray2};
  margin-bottom: 12px;
`;

export const Description = ({
  value,
  isEdinInProcess,
  onChange,
}: {
  value: string;
  isEdinInProcess: boolean;
  onChange: (value: string) => void;
}) => {
  return (
    <>
      {isEdinInProcess ? (
        <Input
          maxRows={3}
          value={value}
          onChange={(e: any) => {
            onChange(e.target.value);
          }}
          placeholder={"Enter description"}
        />
      ) : (
        <Title>{`"${value}"`}</Title>
      )}
    </>
  );
};
