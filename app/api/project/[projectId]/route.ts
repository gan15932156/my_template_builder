import { cloudinary } from "@/config/cloudinary-config";
import db from "@/config/prisma";
import { uploadToCloudinary } from "@/utils/mediaUtils";

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
    if (res?.data) {
      return Response.json(
        {
          success: true,
          data: res?.data,
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
  const projectId = (await params).projectId;
  if (!projectId) {
    return Response.json(
      {
        success: false,
        message: "Fail to update project",
      },
      { status: 404 }
    );
  }
  try {
    const body = await request.json();
    const oldData = await db.project.findUnique({ where: { id: projectId } });
    const regex = /nextjs_uploads\/([^\.]+)/;
    if (oldData?.imageUrl) {
      const match = oldData?.imageUrl.match(regex);
      if (match && match[1]) {
        const publicId = `nextjs_uploads/${match[1]}`;
        await cloudinary.uploader.destroy(publicId);
      }
    }
    const imageRes = await uploadToCloudinary(
      body.imgData,
      `screenshot_${projectId}`
    );
    if (imageRes.success && imageRes.result) {
      const res = await db.project.update({
        where: {
          id: projectId,
        },
        data: {
          data: body.data,
          imageUrl: imageRes.result.secure_url,
        },
      });
      if (res) {
        return Response.json(
          {
            success: true,
            message: "Success",
            data: res.data,
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
    } else {
      throw new Error("Failed to upload to Cloudinary");
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
