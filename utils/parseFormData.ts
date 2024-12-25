import { createWriteStream } from "fs";
import { mkdir } from "fs/promises";
import { Readable } from "stream";
import path from "path";

// Ensure the uploads directory exists
const ensureDirectory = async (dir: string) => {
  try {
    await mkdir(dir, { recursive: true });
  } catch (err) {
    if (
      err instanceof Error &&
      (err as NodeJS.ErrnoException).code !== "EEXIST"
    ) {
      throw err;
    }
  }
};

// Save the uploaded file
const saveFile = async (
  fileBuffer: Buffer,
  folder: string,
  filename: string
) => {
  const filePath = path.join(
    process.cwd(),
    "public",
    "uploads",
    folder,
    filename
  );
  await ensureDirectory(path.dirname(filePath));

  return new Promise<string>((resolve, reject) => {
    const writeStream = createWriteStream(filePath);
    Readable.from(fileBuffer).pipe(writeStream);
    writeStream.on("finish", () => resolve(`/uploads/${folder}/${filename}`));
    writeStream.on("error", reject);
  });
};

// Helper to parse the form data manually
export async function parseFormData(
  req: Request
): Promise<Record<string, any>> {
  const contentType = req.headers.get("content-type");
  const boundary = contentType?.split("boundary=")?.[1];
  if (!boundary) {
    throw new Error("No boundary in Content-Type header");
  }

  const decoder = new TextDecoder();
  const reader = req.body?.getReader();
  if (!reader) {
    throw new Error("No body found in the request");
  }

  let buffer = new Uint8Array();
  let result: ReadableStreamReadResult<Uint8Array>;

  // Read all incoming chunks into a single buffer
  while (!(result = await reader.read()).done) {
    const chunk = result.value;
    const newBuffer = new Uint8Array(buffer.length + chunk.length);
    newBuffer.set(buffer);
    newBuffer.set(chunk, buffer.length);
    buffer = newBuffer;
  }

  const parts = buffer
    .toString()
    .split(`--${boundary}`)
    .filter((part) => part.trim() !== "--" && part.trim() !== "");

  const formData: Record<string, any> = {};

  for (const part of parts) {
    const [headersPart, ...bodyParts] = part.split("\r\n\r\n");
    if (!headersPart || bodyParts.length === 0) continue;

    const headers = headersPart.split("\r\n");
    const contentDisposition = headers.find((h) =>
      h.startsWith("Content-Disposition")
    );

    if (!contentDisposition) continue;

    const nameMatch = contentDisposition.match(/name="([^"]+)"/);
    const filenameMatch = contentDisposition.match(/filename="([^"]+)"/);
    const name = nameMatch?.[1];
    const filename = filenameMatch?.[1];

    if (name && filename) {
      // File part
      const rawFile = Buffer.from(bodyParts.join("\r\n"), "binary");
      const folder = name.includes("zoneOneBanner")
        ? "banners"
        : name.includes("images")
        ? "images"
        : "files";

      const savedFilePath = await saveFile(rawFile, folder, filename);
      if (!formData[name]) {
        formData[name] = [];
      }
      formData[name].push(savedFilePath);
    } else if (name) {
      // Regular field
      const value = bodyParts.join("\r\n").trim();
      formData[name] = value;
    }
  }

  return formData;
}
