import multer from "multer";
import fs from "fs";
import path from "path";

const uploader = (dir='/') => {
  
  const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      // const filePath = path.join(__dirname, "../../public/uploads"+dir)
      const filePath = "./public/uploads"+dir;

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true });
      }

      cb(null, filePath);
    },
    filename: (req, file, cb) => {
      const filename = Date.now() + "-" + file.originalname;
      cb(null, filename);
    },
  });

  // const imageFilter = (req, file, cb) => {
  //   const ext = file.originalname.split(".").pop()
  //   const allowed = ['jpg','jpeg','png','svg','webp','bmp','gif']

  //   if(allowed.includes(ext)) {
  //     cb(null, true)
  //   } else {
  //     cb({code: 422, message: "File format not supported"})
  //   }
  // }

  const multerObj = multer({
    // dest: "/path for your file"
    // storage: "configure your storage "
    storage: myStorage,
    // fileFilter: imageFilter,
    fileFilter: (req, file, cb) => {
      const ext = file.originalname.split(".").pop() as string
      const allowed = ['jpg','jpeg','png','svg','webp','bmp','gif']

      if(allowed.includes(ext)) {
        cb(null, true)
      } else {
        cb(new Error("File format not supported"))
      }
    },
    limits: {
      fileSize: 3000000
    }
  });
  // console.log(multerObj)
  return multerObj;
}

export default uploader;