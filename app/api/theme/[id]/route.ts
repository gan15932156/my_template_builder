import db from "@/config/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const themeId = (await params).id;
  if (!themeId) {
    return Response.json(
      {
        success: false,
        data: {},
        message: "Fail to load theme",
      },
      { status: 404 }
    );
  }
  try {
    const res = await db.theme.findUnique({ where: { id: themeId } });
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
    console.error("Error on select theme", error);
    return Response.json(
      {
        success: false,
        message: "Fail to select theme",
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
  { params }: { params: Promise<{ id: string }> }
) {
  const themeId = (await params).id;
  if (!themeId) {
    return Response.json(
      {
        success: false,
        data: {},
        message: "Fail to update theme",
      },
      { status: 404 }
    );
  }
  try {
    const { id, createdAt, updatedAt, colorVars, styles, ...rest } =
      await request.json();
    const res = await db.theme.update({
      where: {
        id: themeId,
      },
      data: {
        ...rest,
        colorVars,
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
    console.error("Error on select theme", error);
    return Response.json(
      {
        success: false,
        message: "Fail to select theme",
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
  { params }: { params: Promise<{ id: string }> }
) {
  const themeId = (await params).id;
  if (!themeId) {
    return Response.json(
      {
        success: false,
        data: {},
        message: "Fail to load theme",
      },
      { status: 404 }
    );
  }
  try {
    const res = await db.theme.delete({ where: { id: themeId } });
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
    console.error("Error on delete theme", error);
    return Response.json(
      {
        success: false,
        message: "Fail to delete theme",
        data: {},
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
