"use client";

import styled from "styled-components";

const EditorWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 20rem;
  grid-template-rows: min-content 1fr;
  height: calc(100vh - 2rem);
`;
export default EditorWrapper;
