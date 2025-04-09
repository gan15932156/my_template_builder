"use client";

import BaseTableHeader from "@/app/components/BaseTableHeader";
import ActionColumn from "@/Features/theme/components/ActionColumn";
import { ApiResponse, TTheme } from "@/types/types";
import { formattedDate } from "@/utils";
import { searchParamsSchema, searchParamsSchemaType } from "@/zodObject";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";

const fetchThemes = async (
  searchParams: searchParamsSchemaType
): Promise<ApiResponse<{ themes: TTheme[]; pageCount: number }>> => {
  const { page, per_page } = searchParams;
  const offset = (page - 1) * per_page;
  const apiPath = `/api/theme?offset=${offset}&limit=${per_page}`;
  return fetch(apiPath, { method: "GET" }).then((response) => response.json());
};

const useThemeTableData = () => {
  const searchParams = useSearchParams();
  const search = searchParamsSchema.parse(Object.fromEntries(searchParams));
  const { data, isError, isLoading } = useQuery({
    queryKey: ["themes", search],
    queryFn: () => fetchThemes(search),
    placeholderData: keepPreviousData,
    select: (data) => data.data,
  });
  const columns: ColumnDef<TTheme, any>[] = [
    {
      id: "no",
      header: () => <BaseTableHeader text={"No."} />,
      cell: (info) => (
        <div style={{ textAlign: "center" }}>{info.row.index + 1}</div>
      ),
    },
    {
      id: "name",
      accessorKey: "name",
      header: () => "Name",
      cell: (info) => (
        <div style={{ textAlign: "center" }}>
          {info.getValue() == null ? "-" : info.getValue()}
        </div>
      ),
    },
    {
      id: "createdAt",
      accessorKey: "createdAt",
      header: () => "Created at",
      cell: (info) => (
        <div style={{ textAlign: "center" }}>
          {formattedDate(info.getValue())}
        </div>
      ),
    },
    {
      id: "action",
      header: () => "Action",
      cell: (info) => <ActionColumn row={info.row} />,
    },
  ];
  return { columns, data, isError, isLoading };
};

export default useThemeTableData;
