import { v2 as cloudinary } from "cloudinary";

let configured = false;

function ensureConfigured() {
  if (configured) return;
  const cloud_name = process.env.CLOUDINARY_CLOUD_NAME;
  const api_key = process.env.CLOUDINARY_API_KEY;
  const api_secret = process.env.CLOUDINARY_API_SECRET;

  if (!cloud_name || !api_key || !api_secret) {
    throw new Error("Missing Cloudinary environment configuration variables!");
  }

  cloudinary.config({
    cloud_name,
    api_key,
    api_secret,
    secure: true
  });
  configured = true;
}

export async function uploadToCloudinary(fileStr: string, folder = "shelters") {
  ensureConfigured();
  const result = await cloudinary.uploader.upload(fileStr, {
    folder,
    resource_type: "auto"
  });
  return result.secure_url;
}

export async function deleteFromCloudinary(url: string) {
  ensureConfigured();
  const parts = url.split("/");
  const fileName = parts[parts.length - 1];
  const publicId = fileName.split(".")[0];
  const folderIndex = parts.indexOf("shelters") !== -1 ? parts.indexOf("shelters") : parts.indexOf("electrical");
  const id = folderIndex !== -1 ? parts.slice(folderIndex).join("/").split(".")[0] : publicId;
  await cloudinary.uploader.destroy(id);
}
