import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { urlEncode } from "@/utils/encodingTools";

export default function UrlEncodePage() {
  return (
    <ToolsPageTemplate title="URL Encode" description="Encode teks agar aman dipakai di URL.">
      <TextTransformTool
        inputLabel="Teks"
        outputLabel="Hasil Encode"
        actionLabel="Encode"
        transform={urlEncode}
      />
    </ToolsPageTemplate>
  );
}
