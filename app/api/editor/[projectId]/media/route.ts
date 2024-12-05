import { cloudinary } from "@/config/cloudinary-config";
import { uploadFiles } from "@/utils/mediaUtils";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  if (!(await params).projectId) {
    return Response.json(
      {
        success: false,
        data: {},
        message: "Not found project id",
      },
      { status: 404 }
    );
  }
  const formData = await request.formData();
  const files = formData.getAll("files") as File[];
  const responseImagesUrl = await uploadFiles(files);
  return Response.json(
    {
      success: true,
      data: responseImagesUrl,
      message: "Success",
    },
    { status: 200 }
  );
}
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ projectId: string }> }
) {
  if (!(await params).projectId) {
    return Response.json(
      {
        success: false,
        data: {},
        message: "Not found project id",
      },
      { status: 404 }
    );
  }
  const body = await request.json();
  const result = await cloudinary.uploader.destroy(body.publicId);
  if (result.result === "ok") {
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
        message: "Unable to delete this image",
      },
      { status: 500 }
    );
  }
}
