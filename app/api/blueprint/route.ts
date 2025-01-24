import db from "@/config/prisma";
import { NextRequest } from "next/server";

export async function POST() {
  try {
    const res = await db.blueprint.create({ data: {} });
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
          message: "Fail to create blueprint",
          data: "",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error on create blueprint", error);
    return Response.json(
      {
        success: false,
        message: "Fail to create blueprint",
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
    const [blueprints, totalBlueprint] = await db.$transaction([
      db.blueprint.findMany({
        select: {
          id: true,
          name: true,
          imageUrl: true,
          category: true,
          status: true,
          createdAt: true,
        },
        skip: offset,
        take: limit,
      }),
      db.blueprint.count(),
    ]);
    const pageCount = Math.ceil(totalBlueprint / limit);
    return Response.json(
      {
        success: true,
        message: "Success",
        data: { blueprints, pageCount },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error on get blueprint", error);
    return Response.json(
      {
        success: false,
        message: "Fail to load blueprint",
        data: [],
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
