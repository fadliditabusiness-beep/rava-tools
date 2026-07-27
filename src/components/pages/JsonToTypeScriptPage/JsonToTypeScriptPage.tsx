import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { jsonToTypeScript } from "@/utils/jsonToTs";

export default function JsonToTypeScriptPage() {
  return (
    <ToolsPageTemplate
      title="JSON to TypeScript"
      description="Buat interface TypeScript dari contoh JSON."
    >
      <TextTransformTool
        inputLabel="JSON"
        outputLabel="TypeScript"
        actionLabel="Konversi"
        inputPlaceholder='{"id":1,"nama":"Budi","aktif":true}'
        transform={(input) => jsonToTypeScript(input)}
      />
    </ToolsPageTemplate>
  );
}
