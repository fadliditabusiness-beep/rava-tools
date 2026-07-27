import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { formatJson } from "@/utils/codeFormatters";

export default function JsonFormatterPage() {
  return (
    <ToolsPageTemplate title="JSON Formatter" description="Rapikan (pretty-print) JSON.">
      <TextTransformTool
        inputLabel="JSON"
        actionLabel="Format"
        inputPlaceholder='{"nama":"Budi","umur":30}'
        transform={formatJson}
      />
    </ToolsPageTemplate>
  );
}
