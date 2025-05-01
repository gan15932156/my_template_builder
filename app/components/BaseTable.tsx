"use client";
import { editorStyle } from "@/Features/blueprint/constants/editorStyle";
import { flexRender, Table as TableType } from "@tanstack/react-table";
import styled from "styled-components";
interface Props<TData> {
  table: TableType<TData>;
}
const Container = styled.div`
  width: 100%;
`;
const Table = styled.table`
  border-collapse: collapse;
  min-width: 40rem;
  width: 100%;
`;
const Td = styled.td`
  padding: 0.2rem;
  color: ${editorStyle.primary300};
  border: 1px solid ${editorStyle.white200};
`;
const Th = styled.th`
  padding: 0.2rem;
  background-color: ${editorStyle.primary500};
  color: ${editorStyle.white};
  font-weight: bold;
  font-size: 0.8rem;
  border: 1px solid ${editorStyle.white200};
`;
const Tr = styled.tr`
  background-color: ${editorStyle.white100};
  &:nth-child(odd) {
    background-color: ${editorStyle.white};
  }
`;
const BaseTable = <TData,>({ table }: Props<TData>) => {
  // https://www.youtube.com/watch?v=EaTNDGrCYIU&t=1640s
  return (
    <Container>
      <Table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <Th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </Th>
              ))}
            </Tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <Tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <Td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                ))}
              </Tr>
            ))
          ) : (
            <Tr>
              <Td colSpan={10}>No data</Td>
            </Tr>
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default BaseTable;
