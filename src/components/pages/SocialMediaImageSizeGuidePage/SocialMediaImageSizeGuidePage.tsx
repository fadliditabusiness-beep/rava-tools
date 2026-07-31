import ToolsPageTemplate from "@/components/templates/ToolsPageTemplate/ToolsPageTemplate";
import { SOCIAL_IMAGE_SIZES } from "@/constants/socialImageSizes";

export default function SocialMediaImageSizeGuidePage() {
  return (
    <ToolsPageTemplate
      title="Social Media Image Size Guide"
      description="Ukuran gambar yang direkomendasikan untuk tiap platform media sosial."
      wide
    >
      <p className="mb-6 text-center text-xs text-slate-500 dark:text-slate-400">
        Ukuran bisa berubah sewaktu-waktu mengikuti kebijakan tiap platform — gunakan sebagai acuan umum.
      </p>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {SOCIAL_IMAGE_SIZES.map((platform) => (
          <div
            key={platform.platform}
            className="overflow-hidden rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"
          >
            <div className="border-b border-slate-200 bg-slate-50 px-4 py-2.5 dark:border-slate-800 dark:bg-slate-950/50">
              <h2 className="font-semibold text-slate-900 dark:text-slate-50">{platform.platform}</h2>
            </div>
            <table className="w-full text-sm">
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {platform.sizes.map((row) => (
                  <tr key={row.asset}>
                    <td className="px-4 py-2.5 text-slate-600 dark:text-slate-300">{row.asset}</td>
                    <td className="px-4 py-2.5 text-right font-mono text-slate-800 dark:text-slate-100">
                      {row.size}
                    </td>
                    <td className="px-4 py-2.5 text-right text-xs text-slate-400">{row.ratio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </ToolsPageTemplate>
  );
}
