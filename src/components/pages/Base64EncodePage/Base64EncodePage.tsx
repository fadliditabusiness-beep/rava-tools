import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { base64Encode } from "@/utils/encodingTools";

export default function Base64EncodePage() {
  return (
    <ToolsPageTemplate title="Base64 Encode" description="Ubah teks menjadi Base64.">
      <TextTransformTool
        inputLabel="Teks"
        outputLabel="Base64"
        actionLabel="Encode"
        transform={base64Encode}
      />
    </ToolsPageTemplate>
  );
}
