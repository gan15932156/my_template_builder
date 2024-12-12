import db from "@/config/prisma";
import { NextRequest } from "next/server";

export async function POST(request: Request) {
  // const body: unknown = await request.json();
  // const parsedBody = zodProject.safeParse(body);
  // if (!parsedBody.success) {
  //   console.log(JSON.stringify(parsedBody.error));
  //   return Response.json(
  //     {
  //       success: false,
  //       message: "Fail to create project",
  //       data: {},
  //     },
  //     { status: 500 }
  //   );
  // }
  // console.log(parsedBody.data);
  try {
    const res = await db.project.create({ data: {} });
    if (res) {
      return Response.json(
        {
          success: true,
          message: "Success",
          data: res.id,
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Fail to create project",
          data: "",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error on create project", error);
    return Response.json(
      {
        success: false,
        message: "Fail to create project",
        data: "",
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams,
      offset = parseInt(searchParams.get("offset") as string) || 0,
      limit = parseInt(searchParams.get("limit") as string) || 2;
    const [projects, totalProject] = await db.$transaction([
      db.project.findMany({
        select: {
          id: true,
          name: true,
          imageUrl: true,
          status: true,
          createdAt: true,
        },
        skip: offset,
        take: limit,
      }),
      db.project.count(),
    ]);
    const pageCount = Math.ceil(totalProject / limit);
    return Response.json(
      {
        success: true,
        message: "Success",
        data: { projects, pageCount },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error on get project", error);
    return Response.json(
      {
        success: false,
        message: "Fail to load project",
        data: [],
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
