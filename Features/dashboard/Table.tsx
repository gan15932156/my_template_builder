"use client";
import styles from "./Table.module.css";
import useTanStackTable from "@/hooks/useTanStackTable";
import useProjectTableData from "@/hooks/useProjectTableData";
import BaseTable from "@/app/components/BaseTable";
import BaseTablePagination from "@/app/components/BaseTablePagination";
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
      <div className={styles.tableContainer}>
        <BaseTable table={table} />
        <BaseTablePagination table={table} />
      </div>
    )
  );
};

export default Table;
