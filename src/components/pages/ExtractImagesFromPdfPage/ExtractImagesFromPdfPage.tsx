import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfExtractImagesTool from "@/components/organisms/PdfExtractImagesTool/PdfExtractImagesTool";

export default function ExtractImagesFromPdfPage() {
  return (
    <ToolsPageTemplate
      title="Extract Images from PDF"
      description="Ambil semua gambar yang ada di dalam PDF."
    >
      <PdfExtractImagesTool />
    </ToolsPageTemplate>
  );
}
