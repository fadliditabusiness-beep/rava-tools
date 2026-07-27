import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import CssGradientTool from "@/components/organisms/CssGradientTool/CssGradientTool";

export default function CssGradientGeneratorPage() {
  return (
    <ToolsPageTemplate title="CSS Gradient Generator" description="Buat gradient CSS, lengkap dengan preview.">
      <CssGradientTool />
    </ToolsPageTemplate>
  );
}
