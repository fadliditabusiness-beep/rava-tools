import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { urlDecode } from "@/utils/encodingTools";

export default function UrlDecodePage() {
  return (
    <ToolsPageTemplate title="URL Decode" description="Decode URL-encoded string kembali ke teks asli.">
      <TextTransformTool
        inputLabel="URL Encoded"
        outputLabel="Teks"
        actionLabel="Decode"
        transform={urlDecode}
      />
    </ToolsPageTemplate>
  );
}
