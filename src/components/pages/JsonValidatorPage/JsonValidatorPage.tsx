import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { validateJson } from "@/utils/codeFormatters";

export default function JsonValidatorPage() {
  return (
    <ToolsPageTemplate title="JSON Validator" description="Cek apakah JSON valid.">
      <TextTransformTool
        inputLabel="JSON"
        actionLabel="Validasi"
        inputPlaceholder='{"nama":"Budi","umur":30}'
        transform={validateJson}
      />
    </ToolsPageTemplate>
  );
}
