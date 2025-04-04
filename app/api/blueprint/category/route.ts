import db from "@/config/prisma";

export async function GET() {
  try {
    let categories = new Set<string>(["other"]);
    const blueprints = await db.blueprint.findMany({
      select: {
        id: true,
        name: true,
        category: true,
      },
    });
    blueprints.forEach((blueprint) => {
      const category = blueprint.category ?? "other";
      if (!categories.has(category)) {
        categories.add(category); // Initialize category if not present
      }
    });
    return Response.json(
      {
        success: true,
        message: "Success",
        data: [...categories.values()],
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error on get blueprint category", error);
    return Response.json(
      {
        success: false,
        message: "Fail to load blueprint category",
        data: new Set([]),
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
