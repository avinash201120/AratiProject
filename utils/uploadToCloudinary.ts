import cloudinary from "@/utils/cloudinary";

export const uploadToCloudinary = async (
  file: File,
  folder: string
): Promise<string> => {
  const fileBuffer = await file.arrayBuffer();

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto", folder: folder },
      (error, result) => {
        if (error) {
          reject(error); // Reject the promise if upload fails
        } else if (result) {
          resolve(result.secure_url); // Return the Cloudinary file URL
        } else {
          reject(new Error("Unknown error occurred during upload"));
        }
      }
    );

    // Pass the file buffer to Cloudinary upload stream
    uploadStream.end(Buffer.from(fileBuffer));
  });
};
