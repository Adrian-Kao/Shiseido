import { Link } from "react-router-dom";

export default function CompletionRatePage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Link to="/" className="text-sm text-slate-500 underline">
        ← Back to Dashboard
      </Link>

      <h2 className="mt-4 text-2xl font-semibold mb-2">Completion Rate – Detail</h2>
      <p className="text-slate-600 mb-4">
        放漏斗圖、不同活動 / 渠道的完成率比較。
      </p>
    </div>
  );
}
