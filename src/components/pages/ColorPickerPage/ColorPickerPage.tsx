import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ColorPickerTool from "@/components/organisms/ColorPickerTool/ColorPickerTool";

export default function ColorPickerPage() {
  return (
    <ToolsPageTemplate title="Color Picker" description="Pilih warna, lihat nilai HEX/RGB/HSL.">
      <ColorPickerTool />
    </ToolsPageTemplate>
  );
}
