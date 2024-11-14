"use client";

import { Table } from "@tanstack/react-table";
import styles from "./BaseTablePagination.module.css";
interface Props<TData> {
  table: Table<TData>;
}

const BaseTablePagination = <TData,>({ table }: Props<TData>) => {
  return (
    <div className={styles.paginateContainer}>
      {table.getCanPreviousPage() && (
        <div>
          <button
            className={styles.paginateButton}
            onClick={() => table.previousPage()}
          >
            {"<"}
          </button>
        </div>
      )}

      {table.getState().pagination.pageIndex + 1 >= 4 && (
        <div>
          <button
            className={styles.paginateButton}
            onClick={() => table.setPageIndex(0)}
          >
            1
          </button>
        </div>
      )}

      {table.getState().pagination.pageIndex + 1 >= 5 && (
        <div>
          <button className={styles.paginateButton}>{">>"}</button>
        </div>
      )}

      {table.getState().pagination.pageIndex + 1 - 2 > 0 && (
        <div>
          <button
            className={styles.paginateButton}
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex - 2)
            }
          >
            {table.getState().pagination.pageIndex + 1 - 2}
          </button>
        </div>
      )}
      {table.getState().pagination.pageIndex + 1 - 1 > 0 && (
        <div>
          <button
            className={styles.paginateButton}
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex - 1)
            }
          >
            {table.getState().pagination.pageIndex + 1 - 1}
          </button>
        </div>
      )}
      <div>
        <button className={styles.paginateButton}>
          {table.getState().pagination.pageIndex + 1}
        </button>
      </div>
      {table.getState().pagination.pageIndex + 1 + 1 <=
        table?.getPageCount() && (
        <div>
          <button
            className={styles.paginateButton}
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex + 1)
            }
          >
            {table.getState().pagination.pageIndex + 1 + 1}
          </button>
        </div>
      )}
      {table.getState().pagination.pageIndex + 1 + 2 <=
        table?.getPageCount() && (
        <div>
          <button
            className={styles.paginateButton}
            onClick={() =>
              table.setPageIndex(table.getState().pagination.pageIndex + 2)
            }
          >
            {table.getState().pagination.pageIndex + 1 + 2}
          </button>
        </div>
      )}
      {table.getState().pagination.pageIndex + 1 + 2 <
        table?.getPageCount() - 1 && <div>{".a/s.dasd"}</div>}
      {table.getState().pagination.pageIndex + 1 + 2 <
        table?.getPageCount() && (
        <div>
          <button
            className={styles.paginateButton}
            onClick={() => table.setPageIndex(table?.getPageCount())}
          >
            {table?.getPageCount()}
          </button>
        </div>
      )}
      {table.getCanNextPage() && (
        <div>
          <button
            className={styles.paginateButton}
            onClick={() => table.nextPage()}
          >
            {">"}
          </button>
        </div>
      )}
    </div>
  );
};

export default BaseTablePagination;
