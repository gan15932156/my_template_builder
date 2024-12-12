import db from "@/config/prisma";
import { NextRequest } from "next/server";
export async function POST() {
  try {
    const res = await db.component.create({ data: {} });
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
          message: "Fail to create component",
          data: "",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error on create component", error);
    return Response.json(
      {
        success: false,
        message: "Fail to create component",
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
    const [components, totalComponents] = await db.$transaction([
      db.component.findMany({
        select: {
          id: true,
          name: true,
          imageUrl: true,
          status: true,
          category: true,
          createdAt: true,
        },
        skip: offset,
        take: limit,
      }),
      db.component.count(),
    ]);
    const pageCount = Math.ceil(totalComponents / limit);
    return Response.json(
      {
        success: true,
        message: "Success",
        data: { components, pageCount },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error on get component", error);
    return Response.json(
      {
        success: false,
        message: "Fail to load component",
        data: [],
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
