import JSZip from "jszip";
import type { NamedBlob } from "@/utils/pdfTools";

export async function zipFiles(files: NamedBlob[], zipName: string): Promise<NamedBlob> {
  const zip = new JSZip();
  files.forEach((file) => zip.file(file.name, file.blob));
  const blob = await zip.generateAsync({ type: "blob" });
  return { name: zipName, blob };
}
