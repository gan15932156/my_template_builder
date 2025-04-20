import db from "@/config/prisma";
export async function GET() {
  try {
    const themes = await db.theme.findMany({});
    return Response.json(
      {
        success: true,
        message: "Success",
        data: themes,
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
