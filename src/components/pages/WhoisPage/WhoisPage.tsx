import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import WhoisTool from "@/components/organisms/WhoisTool/WhoisTool";

export default function WhoisPage() {
  return (
    <ToolsPageTemplate title="WHOIS" description="Cek info registrasi domain: registrar, tanggal daftar & kadaluarsa.">
      <WhoisTool />
    </ToolsPageTemplate>
  );
}
