import React from "react";
// @ts-ignore
import styled from "@xstyled/styled-components";
import { Board } from "../components/board/Board";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${(props: any) => props.theme.colors.gray5};
  padding: 32px;
`;

function App({ classes, ...props }: any) {
  return (
    <Wrapper>
      <Board />
    </Wrapper>
  );
}

export default App;
