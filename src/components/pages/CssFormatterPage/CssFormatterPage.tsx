import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { formatCss } from "@/utils/codeFormatters";

export default function CssFormatterPage() {
  return (
    <ToolsPageTemplate title="CSS Formatter" description="Rapikan (pretty-print) CSS.">
      <TextTransformTool
        inputLabel="CSS"
        actionLabel="Format"
        inputPlaceholder=".btn{color:red;padding:4px}"
        transform={formatCss}
      />
    </ToolsPageTemplate>
  );
}
