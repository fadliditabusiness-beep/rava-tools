import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import TextTransformTool from "@/components/organisms/TextTransformTool/TextTransformTool";
import { decodeJwt } from "@/utils/jwtTools";

export default function JwtDecoderPage() {
  return (
    <ToolsPageTemplate
      title="JWT Decoder"
      description="Decode header & payload JWT (tanpa verifikasi signature)."
    >
      <TextTransformTool
        inputLabel="JWT"
        outputLabel="Header & Payload"
        actionLabel="Decode"
        inputPlaceholder="eyJhbGciOi..."
        transform={decodeJwt}
      />
    </ToolsPageTemplate>
  );
}
