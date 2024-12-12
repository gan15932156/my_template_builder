"use client";

import Badge from "@/app/components/Badge";
import BaseTableHeader from "@/app/components/BaseTableHeader";
import ActionColumn from "@/Features/componentEditor/ActionColumn";
import { ApiResponse, IComponent } from "@/types/types";
import { formattedDate } from "@/utils";
import {
  searchParamsSchema,
  searchParamsSchemaType,
  TComponentCategoryEnum,
} from "@/zodObject";
import { ProjectStatus } from "@prisma/client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const fetchComponents = async (
  searchParams: searchParamsSchemaType
): Promise<ApiResponse<{ components: IComponent[]; pageCount: number }>> => {
  const { page, per_page } = searchParams;
  const offset = (page - 1) * per_page;
  const apiPath = `/api/component?offset=${offset}&limit=${per_page}`;
  return fetch(apiPath, { method: "GET" }).then((response) => response.json());
};
const useComponentTableData = () => {
  const searchParams = useSearchParams();
  const search = searchParamsSchema.parse(Object.fromEntries(searchParams));
  const { data, isError, isLoading } = useQuery({
    queryKey: ["components", search],
    queryFn: () => fetchComponents(search),
    placeholderData: keepPreviousData,
    select: (data) => data.data,
  });
  const columns: ColumnDef<IComponent, any>[] = [
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
      cell: (info) =>
        info.getValue() ? (
          <div style={{ textAlign: "center", position: "relative" }}>
            <Image
              style={{ objectFit: "contain" }}
              width={320}
              height={160}
              priority={true}
              src={info.getValue()}
              alt="Component screenshot image"
            />
          </div>
        ) : (
          ""
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
      id: "category",
      accessorKey: "category",
      header: () => "Category",
      cell: (info) => (
        <div style={{ textAlign: "center" }}>
          <span style={{ textTransform: "capitalize" }}>
            {info.getValue<TComponentCategoryEnum>().toString() == "COMPONENT"
              ? "Component"
              : info.getValue<TComponentCategoryEnum>().toString() == "SECTION"
              ? "Section"
              : info.getValue<TComponentCategoryEnum>().toString() == "PAGE"
              ? "Page"
              : ""}
          </span>
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

export default useComponentTableData;
