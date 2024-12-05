import db from "@/config/prisma";
import { componentSchema } from "@/zodObject";
export async function GET(
  request: Request,
  { params }: { params: Promise<{ componentId: string }> }
) {
  const componentId = (await params).componentId;
  if (!componentId) {
    return Response.json(
      {
        success: false,
        data: {},
        message: "Fail to load component",
      },
      { status: 404 }
    );
  }
  try {
    const res = await db.component.findUnique({ where: { id: componentId } });
    if (res) {
      return Response.json(
        {
          success: true,
          data: { id: res.id, name: res.name, category: res.category },
          message: "Success",
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        {
          success: true,
          data: {},
          message: "Success",
        },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error("Error on select component", error);
    return Response.json(
      {
        success: false,
        message: "Fail to select component",
        data: {},
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ componentId: string }> }
) {
  if (!(await params).componentId) {
    return Response.json(
      {
        success: false,
        data: {},
        message: "Not found component id",
      },
      { status: 404 }
    );
  }
  const body: unknown = await request.json();
  const parsedBody = componentSchema.safeParse(body);
  if (!parsedBody.success) {
    return Response.json(
      {
        success: false,
        message: "Fail to update component",
        data: {},
      },
      { status: 500 }
    );
  }
  try {
    const res = await db.component.update({
      where: {
        id: (await params).componentId,
      },
      data: {
        category: parsedBody.data.category,
        name: parsedBody.data.name,
      },
    });
    if (res) {
      return Response.json(
        {
          success: true,
          message: "Success",
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Fail to update component",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error on update component", error);
    return Response.json(
      {
        success: false,
        message: "Fail to update component",
        data: "",
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
