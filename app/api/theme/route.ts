import db from "@/config/prisma";
import { NextRequest } from "next/server";

export async function POST() {
  try {
    const res = await db.theme.create({ data: {} });
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
          message: "Fail to create theme",
          data: "",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error on create theme", error);
    return Response.json(
      {
        success: false,
        message: "Fail to create theme",
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
    const [themes, totalTheme] = await db.$transaction([
      db.theme.findMany({
        select: {
          id: true,
          name: true,
          createdAt: true,
        },
        skip: offset,
        take: limit,
      }),
      db.theme.count(),
    ]);
    const pageCount = Math.ceil(totalTheme / limit);
    return Response.json(
      {
        success: true,
        message: "Success",
        data: { themes, pageCount },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error on get theme", error);
    return Response.json(
      {
        success: false,
        message: "Fail to load theme",
        data: [],
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
