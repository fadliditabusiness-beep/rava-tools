import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TimeConverterTool from "@/components/organisms/TimeConverterTool/TimeConverterTool";

export default function TimeConverterPage() {
  return (
    <ToolsPageTemplate title="Time Converter" description="Konversi durasi antar satuan waktu.">
      <TimeConverterTool />
    </ToolsPageTemplate>
  );
}
