import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { base64Decode } from "@/utils/encodingTools";

export default function Base64DecodePage() {
  return (
    <ToolsPageTemplate title="Base64 Decode" description="Ubah Base64 kembali menjadi teks.">
      <TextTransformTool
        inputLabel="Base64"
        outputLabel="Teks"
        actionLabel="Decode"
        transform={base64Decode}
      />
    </ToolsPageTemplate>
  );
}
