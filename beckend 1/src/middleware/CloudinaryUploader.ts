import multer from "multer"
import {CloudinaryStorage} from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary";


const cloudinaryUploader = (dir='/') => {
  const cloudStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: () => {
      return {
        folder: `api-62${dir}`,
        allowed_format: ["jpg", "jpeg", "png", "svg", "webp", "bmp", "gif"],
        unique_filename: true
      };
    }
  })
  return multer({
    storage: cloudStorage
  })
}

export default cloudinaryUploader;