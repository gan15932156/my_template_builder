"use client";

import BaseTable from "@/app/components/BaseTable";
import BaseTablePagination from "@/app/components/BaseTablePagination";
import useBlueprintTableData from "@/hooks/useBlueprintTableData";
import useTanStackTable from "@/hooks/useTanStackTable";
import styles from "@/Features/projectEditor/Table.module.css";
const Table: React.FC = () => {
  const { columns, data, isError, isLoading } = useBlueprintTableData();
  const { table } = useTanStackTable({
    data: data?.blueprints != undefined ? data?.blueprints : [],
    columns,
    pageCount: data?.pageCount,
    defaultPerPage: 10,
  });
  if (isError) return <div>Cannot display blueprint</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    !isError &&
    !isLoading && (
      <div className={styles.tableContainer}>
        <BaseTable table={table} />
        <BaseTablePagination table={table} />
      </div>
    )
  );
};

export default Table;
