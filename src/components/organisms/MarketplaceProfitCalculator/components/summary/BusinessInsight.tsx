export interface BusinessInsightProps {
  insights: string[];
}

export default function BusinessInsight({ insights }: BusinessInsightProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <h3 className="text-sm font-semibold text-slate-800">Business Insight</h3>
      <ul className="mt-3 flex flex-col gap-2">
        {insights.map((insight, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-slate-600">
            <span aria-hidden="true">💡</span>
            <span>{insight}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
