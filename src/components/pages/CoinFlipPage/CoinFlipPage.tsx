import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import Button from "@/components/atoms/Button/Button";
import { flipCoin } from "@/utils/generators";

export default function CoinFlipPage() {
  const [result, setResult] = useState<"Kepala" | "Ekor" | null>(null);

  return (
    <ToolsPageTemplate title="Coin Flip" description="Lempar koin, Kepala atau Ekor.">
      <div className="flex justify-center">
        <Button onClick={() => setResult(flipCoin())}>Lempar Koin</Button>
      </div>

      {result && (
        <div className="mt-6 text-center text-3xl font-bold text-slate-900 dark:text-slate-50">
          {result}
        </div>
      )}
    </ToolsPageTemplate>
  );
}
