import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TimestampConverterTool from "@/components/organisms/TimestampConverterTool/TimestampConverterTool";

export default function UnixTimeConverterPage() {
  return (
    <ToolsPageTemplate
      title="Unix Time Converter"
      description="Konversi Unix time ke tanggal, dan sebaliknya."
    >
      <TimestampConverterTool />
    </ToolsPageTemplate>
  );
}
