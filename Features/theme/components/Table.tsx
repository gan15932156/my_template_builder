"use client";

import BaseTable from "@/app/components/BaseTable";
import BaseTablePagination from "@/app/components/BaseTablePagination";
import useTanStackTable from "@/hooks/useTanStackTable";
import useThemeTableData from "@/hooks/useThemeTableData";
import styled from "styled-components";
const Wrapper = styled.div`
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  width: 80%;
`;

const Table = () => {
  const { columns, data, isError, isLoading } = useThemeTableData();
  const { table } = useTanStackTable({
    data: data?.themes != undefined ? data?.themes : [],
    columns,
    pageCount: data?.pageCount,
    defaultPerPage: 10,
  });
  if (isError) return <div>Cannot display theme</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    !isError &&
    !isLoading && (
      <Wrapper>
        <BaseTable table={table} />
        <BaseTablePagination table={table} />
      </Wrapper>
    )
  );
};

export default Table;
