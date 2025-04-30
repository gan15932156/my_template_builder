import { cloudinary } from "@/config/cloudinary-config";
import db from "@/config/prisma";
import { uploadToCloudinary } from "@/utils/mediaUtils";

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
      blueprint: {
        id,
        isBlueprint,
        createdAt,
        status,
        updatedAt,
        colorVars,
        styles,
        element,
        imageUrl,
        ...rest
      },
      newImage,
    } = await request.json();
    if (newImage) {
      if (imageUrl) {
        const regex = /nextjs_uploads\/([^\.]+)/;
        const match = imageUrl.match(regex);
        if (match && match[1]) {
          const publicId = `nextjs_uploads/${match[1]}`;
          await cloudinary.uploader.destroy(publicId);
        }
      }
      const imageRes = await uploadToCloudinary(newImage, `screenshot_${id}`);
      if (imageRes.success && imageRes.result) {
        const res = await db.blueprint.update({
          where: {
            id,
          },
          data: {
            ...rest,
            colorVars,
            element: element ?? {},
            styles,
            imageUrl: imageRes.result.secure_url,
          },
        });
        if (res) {
          return Response.json(
            {
              success: true,
              message: "Success",
              data: res,
            },
            { status: 200 }
          );
        } else {
          return Response.json(
            {
              success: false,
              message: "Fail to update blieprint",
              data: {},
            },
            { status: 500 }
          );
        }
      } else {
        throw new Error("Failed to upload to Cloudinary");
      }
    } else {
      const res = await db.blueprint.update({
        where: {
          id,
        },
        data: {
          ...rest,
          colorVars,
          imageUrl,
          element: element ?? {},
          styles,
        },
      });
      if (res) {
        return Response.json(
          {
            success: true,
            message: "Success",
            data: res,
          },
          { status: 200 }
        );
      } else {
        return Response.json(
          {
            success: false,
            message: "Fail to update blieprint",
            data: {},
          },
          { status: 500 }
        );
      }
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
    const blueprint = await db.blueprint.findUnique({
      where: { id: blueprintId },
    });
    if (blueprint) {
      if (blueprint.imageUrl) {
        const regex = /nextjs_uploads\/([^\.]+)/;
        const match = blueprint.imageUrl.match(regex);
        if (match && match[1]) {
          const publicId = `nextjs_uploads/${match[1]}`;
          await cloudinary.uploader.destroy(publicId);
        }
      }
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
