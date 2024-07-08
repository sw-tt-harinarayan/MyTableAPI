import { v2 as cloudinary } from "cloudinary";
// Configuration
cloudinary.config({
  cloud_name: "doqaijxs1",
  api_key: "518246518862545",
  api_secret: "95hrKrkUWr_V0vnF2-JGEYp0CYU", // Click 'View Credentials' below to copy your API secret
});

export default async function uploadFileCloudinary(path: any) {
  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(path, {
      public_id: "shoes",
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url("shoes", {
    fetch_format: "auto",
    quality: "auto",
  });

  console.log(optimizeUrl);

  // Transform the image: auto-crop to square aspect_ratio
  const autoCropUrl = cloudinary.url("shoes", {
    crop: "auto",
    gravity: "auto",
    width: 500,
    height: 500,
  });

  console.log(autoCropUrl);
  return autoCropUrl;
}
