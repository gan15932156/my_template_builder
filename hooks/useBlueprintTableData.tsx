"use client";

import Badge from "@/app/components/Badge";
import BaseTableHeader from "@/app/components/BaseTableHeader";
import ActionColumn from "@/Features/blueprint/features/dashboard/components/ActionColumn";
import ImageCell from "@/Features/blueprint/features/dashboard/components/ImageCell";
import { ApiResponse, TBlueprint } from "@/types/types";
import { formattedDate } from "@/utils";
import { searchParamsSchema, searchParamsSchemaType } from "@/zodObject";
import { ProjectStatus } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

import { useSearchParams } from "next/navigation";

const fetchBlueprints = async (
  searchParams: searchParamsSchemaType
): Promise<ApiResponse<{ blueprints: TBlueprint[]; pageCount: number }>> => {
  const { page, per_page } = searchParams;
  const offset = (page - 1) * per_page;
  const apiPath = `/api/blueprint?offset=${offset}&limit=${per_page}`;
  return fetch(apiPath, { method: "GET" }).then((response) => response.json());
};

const useBlueprintTableData = () => {
  const searchParams = useSearchParams();
  const search = searchParamsSchema.parse(Object.fromEntries(searchParams));
  const { data, isError, isLoading } = useQuery({
    queryKey: ["blueprints", search],
    queryFn: () => fetchBlueprints(search),
    placeholderData: keepPreviousData,
    select: (data) => data.data,
  });
  const columns: ColumnDef<TBlueprint, any>[] = [
    {
      id: "no",
      header: () => <BaseTableHeader text={"No."} />,
      cell: (info) => (
        <div style={{ textAlign: "center" }}>{info.row.index + 1}</div>
      ),
    },
    {
      id: "imageUrl",
      accessorKey: "imageUrl",
      header: () => "",
      cell: (info) => <ImageCell row={info.row} />,
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
      id: "status",
      accessorKey: "status",
      header: () => "Status",
      cell: (info) => (
        <div style={{ textAlign: "center" }}>
          <Badge
            variant={
              info.getValue<ProjectStatus>() == "ACTIVE" ? "success" : "danger"
            }
            text={info.getValue()}
          />
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

export default useBlueprintTableData;
