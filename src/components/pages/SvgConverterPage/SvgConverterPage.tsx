import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import SvgConverterTool from "@/components/organisms/SvgConverterTool/SvgConverterTool";

export default function SvgConverterPage() {
  return (
    <ToolsPageTemplate title="SVG Converter" description="Ubah SVG menjadi PNG atau JPG.">
      <SvgConverterTool />
    </ToolsPageTemplate>
  );
}
