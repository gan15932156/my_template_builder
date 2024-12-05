import db from "@/config/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  const projectId = (await params).projectId;
  if (!projectId) {
    return Response.json(
      {
        success: false,
        data: {},
        message: "Fail to load project",
      },
      { status: 404 }
    );
  }
  try {
    const res = await db.project.findUnique({ where: { id: projectId } });
    if (res) {
      return Response.json(
        {
          success: true,
          data: { id: res.id, name: res.name },
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
    console.error("Error on select project", error);
    return Response.json(
      {
        success: false,
        message: "Fail to select project",
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
  { params }: { params: Promise<{ projectId: string }> }
) {
  if (!(await params).projectId) {
    return Response.json(
      {
        success: false,
        message: "Not found project id",
        data: {},
      },
      { status: 404 }
    );
  }
  const body = await request.json();
  try {
    const res = await db.project.update({
      where: {
        id: (await params).projectId,
      },
      data: {
        name: body,
      },
    });
    if (res) {
      return Response.json(
        {
          success: true,
          message: "Success",
          data: {},
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        {
          success: false,
          message: "Fail to update project",
          data: {},
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error on update project", error);
    return Response.json(
      {
        success: false,
        message: "Fail to update project",
        data: {},
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
