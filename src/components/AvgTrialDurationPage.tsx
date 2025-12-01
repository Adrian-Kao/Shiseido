import { Link } from "react-router-dom";

export default function AvgTrialDurationPage() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Link to="/" className="text-sm text-slate-500 underline">
        ← Back to Dashboard
      </Link>

      <h2 className="mt-4 text-2xl font-semibold mb-2">Avg Trial Duration – Detail</h2>
      <p className="text-slate-600 mb-4">
        之後可以放「不同產品線平均試用天數」、「與同業比較」等等。
      </p>
    </div>
  );
}
