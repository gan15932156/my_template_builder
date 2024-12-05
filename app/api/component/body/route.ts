import db from "@/config/prisma";

export async function GET() {
  try {
    const res = await db.component.findMany({
      select: {
        id: true,
        name: true,
        html: true,
        css: true,
        category: true,
      },
    });
    return Response.json(
      {
        success: true,
        message: "Success",
        data: res,
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
