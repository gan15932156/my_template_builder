import { cloudinary } from "@/config/cloudinary-config";
import db from "@/config/prisma";
import { uploadToCloudinary } from "@/utils/mediaUtils";
import { componentBodySchema } from "@/zodObject";

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
          data: {
            css: res.css ? res.css : "",
            html: res.html ? res.html : "",
          },
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
  const componentId = (await params).componentId;
  if (!componentId) {
    return Response.json(
      {
        success: false,
        message: "Fail to update component",
      },
      { status: 404 }
    );
  }

  try {
    const body: unknown = await request.json();
    const parsedBody = componentBodySchema.safeParse(body);
    if (!parsedBody.success) {
      console.log(JSON.stringify(parsedBody.error));
      return Response.json(
        {
          success: false,
          message: "Fail to update component",
          data: {},
        },
        { status: 500 }
      );
    }
    const oldData = await db.component.findUnique({
      where: { id: componentId },
    });
    const regex = /nextjs_uploads\/([^\.]+)/;
    if (oldData?.imageUrl) {
      const match = oldData?.imageUrl.match(regex);
      if (match && match[1]) {
        const publicId = `nextjs_uploads/${match[1]}`;
        await cloudinary.uploader.destroy(publicId);
      }
    }
    const imageRes = await uploadToCloudinary(
      parsedBody.data.imageUri,
      `screenshot_${componentId}`
    );
    if (imageRes.success && imageRes.result) {
      const res = await db.component.update({
        where: {
          id: componentId,
        },
        data: {
          html: parsedBody.data.html,
          css: parsedBody.data.css,
          imageUrl: imageRes.result.secure_url,
        },
      });
      if (res) {
        return Response.json(
          {
            success: true,
            message: "Success",
            data: { html: res.html, css: res.css },
          },
          { status: 200 }
        );
      } else {
        return Response.json(
          {
            success: false,
            message: "Fail to update component",
            data: {},
          },
          { status: 500 }
        );
      }
    } else {
      throw new Error("Failed to upload to Cloudinary");
    }
  } catch (error) {
    console.error("Error on update component", error);
    return Response.json(
      {
        success: false,
        message: "Fail to update component",
        data: {},
      },
      { status: 500 }
    );
  } finally {
    await db.$disconnect();
  }
}
