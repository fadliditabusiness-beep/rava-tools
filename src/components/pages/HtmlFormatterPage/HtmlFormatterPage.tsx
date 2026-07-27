import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { formatHtmlCode } from "@/utils/codeFormatters";

export default function HtmlFormatterPage() {
  return (
    <ToolsPageTemplate title="HTML Formatter" description="Rapikan (pretty-print) HTML.">
      <TextTransformTool
        inputLabel="HTML"
        actionLabel="Format"
        inputPlaceholder="<div><p>Halo</p></div>"
        transform={formatHtmlCode}
      />
    </ToolsPageTemplate>
  );
}
