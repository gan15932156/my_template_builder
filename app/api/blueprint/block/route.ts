import db from "@/config/prisma";

export async function GET() {
  try {
    const res = await db.blueprint.findMany();
    // console.log(res);
    return Response.json(
      {
        success: true,
        data: res,
        message: "Success",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error on select blueprint", error);
    return Response.json(
      {
        success: false,
        message: "Fail to select blueprint",
        data: [],
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
