import multer from "multer";
import path from "path";

const folderMap: Record<
  | "submitExchangeDetails.zoneOneBanner"
  | "submitExchangeDetails.images"
  | "submitExchangeDetails.file"
  | "expectedRequirements.zoneOneBanner"
  | "expectedRequirements.images"
  | "expectedRequirements.file",
  string
> = {
  "submitExchangeDetails.zoneOneBanner": "public/uploads/banners",
  "submitExchangeDetails.images": "public/uploads/images",
  "submitExchangeDetails.file": "public/uploads/files",
  "expectedRequirements.zoneOneBanner": "public/uploads/banners",
  "expectedRequirements.images": "public/uploads/images",
  "expectedRequirements.file": "public/uploads/files",
};

const storage = multer.diskStorage({
  destination: function (_req, file, cb) {
    const folder =
      folderMap[file.fieldname as keyof typeof folderMap] ||
      "public/uploads/others"; // Type assertion
    cb(null, path.join(process.cwd(), folder));
  },
  filename: function (_req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, `${uniqueSuffix}-${file.originalname}`);
  },
});

export default multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (_req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file type"));
    }
  },
});
