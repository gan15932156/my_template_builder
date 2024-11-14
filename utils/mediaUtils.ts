import { UploadApiErrorResponse, UploadApiResponse } from "cloudinary";
import { cloudinary } from "../config/cloudinary-config";

type UploadResponse =
  | { success: true; result?: UploadApiResponse }
  | { success: false; error: UploadApiErrorResponse };

export const uploadToCloudinary = (
  fielUri: string,
  fileName: string
): Promise<UploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload(fielUri, {
        invalidate: true,
        resource_type: "auto",
        filename_override: fileName,
        folder: "nextjs_uploads",
        use_filename: true,
      })
      .then((result) => {
        resolve({ success: true, result });
      })
      .catch((error) => {
        reject({ success: false, error });
      });
  });
};
export const uploadFiles = async (files: File[]) => {
  const responseImagesUrl: { name: string; src: string }[] = [];

  try {
    // Map over files and return promises for each file's upload process
    const uploadPromises = files.map(async (file) => {
      try {
        // Convert the file to a base64 URI
        const fileBuffer = await file.arrayBuffer();
        const mimeType = file.type;
        const encoding = "base64";
        const base64Data = Buffer.from(fileBuffer).toString("base64");
        const fileUri = `data:${mimeType};${encoding},${base64Data}`;

        // Upload the file to Cloudinary (or similar service)
        const res = await uploadToCloudinary(fileUri, file.name);

        // If upload was successful, store the result in responseImagesUrl
        if (res.success && res.result) {
          responseImagesUrl.push({
            name: res.result.original_filename,
            src: res.result.secure_url,
          });
        } else {
          throw new Error("Failed to upload to Cloudinary");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error("File upload failed");
      }
    });

    // Wait for all uploads to finish
    await Promise.all(uploadPromises);

    // Return success response with uploaded image URLs
    return responseImagesUrl;
  } catch (error) {
    console.error("Error during upload process:", error);
    return [];
  }
};

export const generateSignature = (publicId: string, apiSecret: string) => {
  const timestamp = new Date().getTime();
  return `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
};
