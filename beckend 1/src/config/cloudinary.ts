import { v2 as cloudinary } from "cloudinary";
import { CloudinaryConfig } from "./app-env";

cloudinary.config({
  cloud_name: CloudinaryConfig.cloud_name,
  api_key: CloudinaryConfig.api_key,
  api_secret: CloudinaryConfig.api_secret
})

export default cloudinary;