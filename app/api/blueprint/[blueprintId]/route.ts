import db from "@/config/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ blueprintId: string }> }
) {
  const blueprintId = (await params).blueprintId;
  if (!blueprintId) {
    return Response.json(
      {
        success: false,
        data: {},
        message: "Fail to load blueprint",
      },
      { status: 404 }
    );
  }
  try {
    const res = await db.blueprint.findUnique({ where: { id: blueprintId } });
    if (res) {
      return Response.json(
        {
          success: true,
          data: res,
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
    console.error("Error on select blueprint", error);
    return Response.json(
      {
        success: false,
        message: "Fail to select blueprint",
        data: {},
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ blueprintId: string }> }
) {
  const blueprintId = (await params).blueprintId;
  if (!blueprintId) {
    return Response.json(
      {
        success: false,
        data: {},
        message: "Fail to update blueprint",
      },
      { status: 404 }
    );
  }
  try {
    const {
      id,
      isBlueprint,
      createdAt,
      status,
      updatedAt,
      colorVars,
      styles,
      element,
      ...rest
    } = await request.json();
    const res = await db.blueprint.update({
      where: {
        id,
      },
      data: {
        ...rest,
        colorVars,
        element,
        styles,
      },
    });
    if (res) {
      return Response.json(
        {
          success: true,
          data: res,
          message: "Success",
        },
        { status: 200 }
      );
    } else {
      return Response.json(
        {
          success: false,
          data: {},
          message: "Fail",
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error on select blueprint", error);
    return Response.json(
      {
        success: false,
        message: "Fail to select blueprint",
        data: {},
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ blueprintId: string }> }
) {
  const blueprintId = (await params).blueprintId;
  if (!blueprintId) {
    return Response.json(
      {
        success: false,
        data: {},
        message: "Fail to load blueprint",
      },
      { status: 404 }
    );
  }
  try {
    const res = await db.blueprint.delete({ where: { id: blueprintId } });
    if (res) {
      return Response.json(
        {
          success: true,
          data: res,
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
    console.error("Error on delete blueprint", error);
    return Response.json(
      {
        success: false,
        message: "Fail to delete blueprint",
        data: {},
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
