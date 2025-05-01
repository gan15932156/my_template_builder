"use client";

import BaseTable from "@/app/components/BaseTable";
import BaseTablePagination from "@/app/components/BaseTablePagination";
import useComponentTableData from "@/hooks/useComponentTableData";
import useTanStackTable from "@/hooks/useTanStackTable";
import { TableWrapper } from "../projectEditor/Table";
const Table: React.FC = () => {
  const { columns, data, isError, isLoading } = useComponentTableData();
  const { table } = useTanStackTable({
    data: data?.components != undefined ? data?.components : [],
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
