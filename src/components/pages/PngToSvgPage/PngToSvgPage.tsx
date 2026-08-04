import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import PngToSvgTool from "@/components/organisms/PngToSvgTool/PngToSvgTool";

export default function PngToSvgPage() {
  return (
    <ToolsPageTemplate
      title="Convert PNG to SVG"
      description="Bungkus gambar PNG jadi file .svg (embed, bukan vector asli)."
    >
      <PngToSvgTool />
    </ToolsPageTemplate>
  );
}
