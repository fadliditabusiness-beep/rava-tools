import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { generateHashes } from "@/utils/hashTools";

export default function HashGeneratorPage() {
  return (
    <ToolsPageTemplate
      title="Hash Generator"
      description="Hitung hash MD5, SHA-1, dan SHA-256 dari teks."
    >
      <TextTransformTool
        inputLabel="Teks"
        outputLabel="Hash"
        actionLabel="Hitung Hash"
        transform={generateHashes}
      />
    </ToolsPageTemplate>
  );
}
