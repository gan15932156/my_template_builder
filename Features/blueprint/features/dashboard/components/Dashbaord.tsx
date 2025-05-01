"use client";
import styled from "styled-components";
import CreateButton from "./CreateButton";
import Table from "./Table";
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 1.6rem;
  padding-top: 1.2rem;
`;
const Dashbaord = () => {
  return (
    <Wrapper>
      <CreateButton />
      <Table />
    </Wrapper>
  );
};

export default Dashbaord;
