import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfConverterHub from "@/components/organisms/PdfConverterHub/PdfConverterHub";

export default function PdfConverterPage() {
  return (
    <ToolsPageTemplate title="PDF Converter" description="PDF ke gambar, atau gambar ke PDF.">
      <PdfConverterHub />
    </ToolsPageTemplate>
  );
}
