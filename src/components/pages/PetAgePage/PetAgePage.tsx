import { useState } from "react";
import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import NumberField from "@/components/molecules/NumberField/NumberField";
import Select from "@/components/atoms/Select/Select";
import StatTile from "@/components/molecules/StatTile/StatTile";
import { petAgeToHumanYears, type PetSpecies } from "@/utils/simpleCalc";

export default function PetAgePage() {
  const [years, setYears] = useState("3");
  const [species, setSpecies] = useState<PetSpecies>("anjing");

  const yearsNum = Number(years);
  const result = Number.isFinite(yearsNum) ? petAgeToHumanYears(yearsNum, species) : null;

  return (
    <ToolsPageTemplate
      title="Umur Hewan Peliharaan"
      description="Perkiraan umur anjing/kucing setara umur manusia."
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <NumberField label="Umur Hewan (tahun)" value={years} onChange={setYears} />
        <label className="block text-sm">
          <span className="mb-1 block font-medium text-slate-700 dark:text-slate-200">Jenis</span>
          <Select value={species} onChange={(e) => setSpecies(e.target.value as PetSpecies)}>
            <option value="anjing">Anjing</option>
            <option value="kucing">Kucing</option>
          </Select>
        </label>
      </div>

      {result !== null && (
        <div className="mt-6">
          <StatTile label="Setara Umur Manusia" value={`${result.toFixed(1)} tahun`} />
        </div>
      )}

      <p className="mt-4 text-center text-xs text-slate-500 dark:text-slate-400">
        Perkiraan umum, bisa berbeda tergantung jenis & ukuran hewan.
      </p>
    </ToolsPageTemplate>
  );
}
