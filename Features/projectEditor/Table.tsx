"use client";
import useTanStackTable from "@/hooks/useTanStackTable";
import useProjectTableData from "@/hooks/useProjectTableData";
import BaseTable from "@/app/components/BaseTable";
import BaseTablePagination from "@/app/components/BaseTablePagination";
import styled from "styled-components";
export const TableWrapper = styled.div`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 80%;
`;
const Table: React.FC = () => {
  const { columns, data, isError, isLoading } = useProjectTableData();
  const { table } = useTanStackTable({
    data: data?.projects != undefined ? data?.projects : [],
    columns,
    pageCount: data?.pageCount,
    defaultPerPage: 10,
  });
  if (isError) return <div>Cannot display projects</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    !isError &&
    !isLoading && (
      <TableWrapper>
        <BaseTable table={table} />
        <BaseTablePagination table={table} />
      </TableWrapper>
    )
  );
};

export default Table;
