"use client";

import BaseTable from "@/app/components/BaseTable";
import BaseTablePagination from "@/app/components/BaseTablePagination";
import useBlueprintTableData from "@/hooks/useBlueprintTableData";
import useTanStackTable from "@/hooks/useTanStackTable";
import { PER_PAGE_SIZE } from "@/Features/blueprint/constants";
import { TableWrapper } from "@/Features/projectEditor/Table";
import { useEffect } from "react";
const Table = () => {
  const { columns, data, isError, isLoading } = useBlueprintTableData();
  const { table } = useTanStackTable({
    data: data?.blueprints != undefined ? data?.blueprints : [],
    columns,
    pageCount: data?.pageCount,
    defaultPerPage: PER_PAGE_SIZE,
  });
  useEffect(() => {
    console.log(data);
  }, [data]);
  if (isError) return <div>Cannot display blueprint</div>;
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
