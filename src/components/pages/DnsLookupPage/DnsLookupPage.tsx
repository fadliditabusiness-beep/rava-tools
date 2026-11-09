import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import DnsLookupTool from "@/components/organisms/DnsLookupTool/DnsLookupTool";

export default function DnsLookupPage() {
  return (
    <ToolsPageTemplate title="DNS Lookup" description="Lihat record DNS (A, AAAA, MX, TXT, dll) dari suatu domain.">
      <DnsLookupTool />
    </ToolsPageTemplate>
  );
}
