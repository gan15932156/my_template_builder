"use client";

import { Table } from "@tanstack/react-table";
import styled from "styled-components";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
interface Props<TData> {
  table: Table<TData>;
}
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
`;
const Button = styled.button`
  cursor: pointer;
  padding-inline: 1.2rem;
  padding-block: 0.4rem;
  color: ${editorStyle.white};
  text-decoration: none;
  transition: background-color 0.3s, border 0.3s;
  border: 1px solid transparent;
  border-radius: 0.4rem;
  background-color: ${editorStyle.primary500};
  &:hover {
    background-color: ${editorStyle.primary300};
    border: 1px solid white;
  }
`;
const BaseTablePagination = <TData,>({ table }: Props<TData>) => {
  return (
    <Wrapper>
      {table.getCanPreviousPage() && (
        <div>
          <Button onClick={() => table.previousPage()}>{"<"}</Button>
        </div>
      )}

      {table.getState().pagination.pageIndex + 1 >= 4 && (
        <div>
          <Button onClick={() => table.setPageIndex(0)}>1</Button>
        </div>
      )}

      {table.getState().pagination.pageIndex + 1 >= 5 && (
        <div>
          <Button>{">>"}</Button>
        </div>
      )}

      {table.getState().pagination.pageIndex + 1 - 2 > 0 && (
        <div>
          <Button
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex - 2)
            }
          >
            {table.getState().pagination.pageIndex + 1 - 2}
          </Button>
        </div>
      )}
      {table.getState().pagination.pageIndex + 1 - 1 > 0 && (
        <div>
          <Button
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex - 1)
            }
          >
            {table.getState().pagination.pageIndex + 1 - 1}
          </Button>
        </div>
      )}
      <div>
        <Button>{table.getState().pagination.pageIndex + 1}</Button>
      </div>
      {table.getState().pagination.pageIndex + 1 + 1 <=
        table?.getPageCount() && (
        <div>
          <Button
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex + 1)
            }
          >
            {table.getState().pagination.pageIndex + 1 + 1}
          </Button>
        </div>
      )}
      {table.getState().pagination.pageIndex + 1 + 2 <=
        table?.getPageCount() && (
        <div>
          <Button
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex + 2)
            }
          >
            {table.getState().pagination.pageIndex + 1 + 2}
          </Button>
        </div>
      )}
      {table.getState().pagination.pageIndex + 1 + 2 <
        table?.getPageCount() - 1 && <div>{".a/s.dasd"}</div>}
      {table.getState().pagination.pageIndex + 1 + 2 <
        table?.getPageCount() && (
        <div>
          <Button onClick={() => table.setPageIndex(table?.getPageCount())}>
            {table?.getPageCount()}
          </Button>
        </div>
      )}
      {table.getCanNextPage() && (
        <div>
          <Button onClick={() => table.nextPage()}>{">"}</Button>
        </div>
      )}
    </Wrapper>
  );
};

export default BaseTablePagination;
