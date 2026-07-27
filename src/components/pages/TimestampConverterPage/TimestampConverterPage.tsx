import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TimestampConverterTool from "@/components/organisms/TimestampConverterTool/TimestampConverterTool";

export default function TimestampConverterPage() {
  return (
    <ToolsPageTemplate
      title="Timestamp Converter"
      description="Konversi epoch timestamp ke tanggal, dan sebaliknya."
    >
      <TimestampConverterTool />
    </ToolsPageTemplate>
  );
}
