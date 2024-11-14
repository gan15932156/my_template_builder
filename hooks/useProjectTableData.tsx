"use client";

import Badge from "@/app/components/Badge";
import BaseTableHeader from "@/app/components/BaseTableHeader";
import ActionColumn from "@/Features/dashboard/ActionColumn";
import { ApiResponse, IProject, ProjectStatus } from "@/types/types";
import { formattedDate } from "@/utils";
import { searchParamsSchema, searchParamsSchemaType } from "@/zodObject";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";
const fetchProjects = async (
  searchParams: searchParamsSchemaType
): Promise<ApiResponse<{ projects: IProject[]; pageCount: number }>> => {
  const { page, per_page } = searchParams;
  const offset = (page - 1) * per_page;
  const createProjectApiPath = `/api/project?offset=${offset}&limit=${per_page}`;
  return fetch(createProjectApiPath, { method: "GET" }).then((response) =>
    response.json()
  );
};

const useProjectTableData = () => {
  const searchParams = useSearchParams();
  const search = searchParamsSchema.parse(Object.fromEntries(searchParams));
  const { data, isError, isLoading } = useQuery({
    queryKey: ["projects", search],
    queryFn: () => fetchProjects(search),
    placeholderData: keepPreviousData,
    select: (data) => data.data,
  });
  const columns: ColumnDef<IProject, any>[] = [
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

export default useProjectTableData;
