import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { formatXml } from "@/utils/codeFormatters";

export default function XmlFormatterPage() {
  return (
    <ToolsPageTemplate title="XML Formatter" description="Rapikan (pretty-print) XML.">
      <TextTransformTool
        inputLabel="XML"
        actionLabel="Format"
        inputPlaceholder="<root><item>1</item></root>"
        transform={formatXml}
      />
    </ToolsPageTemplate>
  );
}
