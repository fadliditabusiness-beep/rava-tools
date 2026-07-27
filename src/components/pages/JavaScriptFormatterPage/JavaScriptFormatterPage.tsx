import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { formatJavaScript } from "@/utils/codeFormatters";

export default function JavaScriptFormatterPage() {
  return (
    <ToolsPageTemplate title="JavaScript Formatter" description="Rapikan (pretty-print) JavaScript.">
      <TextTransformTool
        inputLabel="JavaScript"
        actionLabel="Format"
        inputPlaceholder="function add(a,b){return a+b}"
        transform={formatJavaScript}
      />
    </ToolsPageTemplate>
  );
}
