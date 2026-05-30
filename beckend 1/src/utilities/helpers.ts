export const mapImage = (file: Express.Multer.File) => {
  return {
    originalname: file.originalname,
    size: file.size,
    filename: file.filename,
    destination: file.destination,
  };
}