import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import ToolsMenu from "@/components/organisms/ToolsMenu/ToolsMenu";

export default function ToolsHomePage() {
  return (
    <ToolsPageTemplate title="Kalkulator Hari" description="Pilih kalkulator yang kamu butuhkan." wide>
      <ToolsMenu />
    </ToolsPageTemplate>
  );
}
