import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PdfCompressTool from "@/components/organisms/PdfCompressTool/PdfCompressTool";

export default function PdfCompressPage() {
  return (
    <ToolsPageTemplate title="Compress PDF" description="Perkecil ukuran file PDF di browser.">
      <PdfCompressTool />
    </ToolsPageTemplate>
  );
}
