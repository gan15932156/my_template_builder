"use client";

import styled from "styled-components";
import { Tooltip } from "react-tooltip";
const Wrapper = styled.div`
  margin-top: 10rem;
  margin-inline: auto;
  text-align: center;
`;
const TestPage = () => {
  return (
    <Wrapper>
      <Test />
    </Wrapper>
  );
};

export default TestPage;

const Test = () => {
  return (
    <>
      <a data-tooltip-id="my-tooltip" data-tooltip-offset={10}>
        ◕‿‿◕
      </a>
      <a data-tooltip-id="my-tooltip" data-tooltip-offset={20}>
        ◕‿‿◕
      </a>
      <a data-tooltip-id="my-tooltip" data-tooltip-offset={30}>
        ◕‿‿◕
      </a>
      <a data-tooltip-id="my-tooltip" data-tooltip-offset={40}>
        ◕‿‿◕
      </a>
      <a data-tooltip-id="my-tooltip" data-tooltip-offset={-20}>
        ◕‿‿◕
      </a>
      <Tooltip id="my-tooltip" content="Hello world!" />
    </>
  );
};
