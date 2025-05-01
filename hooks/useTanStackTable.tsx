"use client";

import { PER_PAGE_SIZE } from "@/Features/blueprint/constants";
import { searchParamsSchema } from "@/zodObject";
import {
  ColumnDef,
  getCoreRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";

interface UseDataTableProps<TData, TValue> {
  data: TData[];
  columns: ColumnDef<TData, TValue>[];
  pageCount?: number;
  defaultPerPage?: number;
}

const useTanStackTable = <TData, TValue>({
  data,
  columns,
  pageCount = -1, // Default to -1 for unknown page count
  defaultPerPage = PER_PAGE_SIZE, // Default rows per page
}: UseDataTableProps<TData, TValue>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Parse current search params using Zod
  const search = searchParamsSchema.parse(Object.fromEntries(searchParams));
  const page = search.page;
  const perPage = search.per_page ?? defaultPerPage;

  // Helper function to construct query strings
  const createQueryString = useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams.toString());
      Object.entries(params).forEach(([key, value]) => {
        if (value === null) {
          newSearchParams.delete(key);
        } else {
          newSearchParams.set(key, String(value));
        }
      });
      return newSearchParams.toString();
    },
    [searchParams]
  );

  // State for pagination (current page and page size)
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: page - 1, // Adjust page number for 0-indexing
    pageSize: perPage,
  });

  const pagination = useMemo(
    () => ({ pageIndex, pageSize }),
    [pageIndex, pageSize]
  );

  // Update the URL when pagination changes
  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1, // Convert back to 1-indexing
        per_page: pageSize,
      })}`,
      { scroll: false }
    );
  }, [pageIndex, pageSize, pathname, router, createQueryString]);

  // Initialize table with tanstack's `useReactTable` hook
  const table = useReactTable({
    data,
    columns,
    pageCount,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true, // Enable manual pagination
  });

  return { table };
};

export default useTanStackTable;
