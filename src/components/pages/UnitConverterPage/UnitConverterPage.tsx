import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import UnitConverterTool from "@/components/organisms/UnitConverterTool/UnitConverterTool";

export default function UnitConverterPage() {
  return (
    <ToolsPageTemplate title="Unit Converter" description="Konversi panjang, berat, volume, & suhu.">
      <UnitConverterTool />
    </ToolsPageTemplate>
  );
}
