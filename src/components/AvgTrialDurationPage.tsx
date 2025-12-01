import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  Timer,
  BarChart3,
  Filter,
  MousePointerClick,
} from "lucide-react";

type ProductLine = {
  id: string;
  name: string;
  avgDays: number;        // 品牌實際平均試用天數
  idealMin: number;       // 建議試用下限
  idealMax: number;       // 建議試用上限
  industryAvg: number;    // 同品類業界平均試用天數
  sampleSize: number;     // 試用樣本數
  shortPct: number;       // 試用天數「過短」的比例
  idealPct: number;       // 試用天數落在理想區間的比例
  longPct: number;        // 試用天數「過長」的比例
};

type MarketDuration = {
  market: string;
  brandAvg: number;
  industryAvg: number;
};

const productLines: ProductLine[] = [
  {
    id: "ultimune",
    name: "Ultimune Power Infusing Concentrate",
    avgDays: 11.8,
    idealMin: 10,
    idealMax: 14,
    industryAvg: 13.2,
    sampleSize: 3200,
    shortPct: 18,
    idealPct: 62,
    longPct: 20,
  },
  {
    id: "white-lucent",
    name: "White Lucent Brightening Line",
    avgDays: 16.3,
    idealMin: 12,
    idealMax: 18,
    industryAvg: 17.5,
    sampleSize: 2700,
    shortPct: 12,
    idealPct: 54,
    longPct: 34,
  },
  {
    id: "vital-perfection",
    name: "Vital Perfection Firming Line",
    avgDays: 19.1,
    idealMin: 14,
    idealMax: 20,
    industryAvg: 18.0,
    sampleSize: 2100,
    shortPct: 9,
    idealPct: 47,
    longPct: 44,
  },
  {
    id: "waso",
    name: "Waso Oil-Control Line",
    avgDays: 9.4,
    idealMin: 8,
    idealMax: 12,
    industryAvg: 10.1,
    sampleSize: 1850,
    shortPct: 22,
    idealPct: 59,
    longPct: 19,
  },
  {
    id: "synchro",
    name: "Synchro Skin Foundation Line",
    avgDays: 7.8,
    idealMin: 7,
    idealMax: 10,
    industryAvg: 8.9,
    sampleSize: 1600,
    shortPct: 25,
    idealPct: 57,
    longPct: 18,
  },
];

const marketDurations: Record<string, MarketDuration[]> = {
  ultimune: [
    { market: "Japan", brandAvg: 12.1, industryAvg: 13.5 },
    { market: "Taiwan", brandAvg: 11.4, industryAvg: 12.8 },
    { market: "United States", brandAvg: 11.9, industryAvg: 13.1 },
    { market: "Singapore", brandAvg: 12.3, industryAvg: 13.7 },
  ],
  "white-lucent": [
    { market: "Japan", brandAvg: 17.0, industryAvg: 18.2 },
    { market: "Taiwan", brandAvg: 15.8, industryAvg: 17.1 },
    { market: "United States", brandAvg: 16.5, industryAvg: 17.9 },
    { market: "Singapore", brandAvg: 16.0, industryAvg: 17.3 },
  ],
  "vital-perfection": [
    { market: "Japan", brandAvg: 19.8, industryAvg: 18.7 },
    { market: "Taiwan", brandAvg: 18.6, industryAvg: 17.9 },
    { market: "United States", brandAvg: 19.2, industryAvg: 18.1 },
    { market: "Singapore", brandAvg: 18.9, industryAvg: 17.8 },
  ],
  waso: [
    { market: "Japan", brandAvg: 9.1, industryAvg: 9.8 },
    { market: "Taiwan", brandAvg: 9.8, industryAvg: 10.5 },
    { market: "United States", brandAvg: 9.3, industryAvg: 10.2 },
    { market: "Singapore", brandAvg: 9.5, industryAvg: 10.0 },
  ],
  synchro: [
    { market: "Japan", brandAvg: 7.5, industryAvg: 8.4 },
    { market: "Taiwan", brandAvg: 8.1, industryAvg: 9.0 },
    { market: "United States", brandAvg: 7.9, industryAvg: 9.3 },
    { market: "Singapore", brandAvg: 7.6, industryAvg: 8.8 },
  ],
};

const totalSampleSize = productLines.reduce(
  (sum, p) => sum + p.sampleSize,
  0
);

const globalAvgDuration =
  productLines.reduce(
    (sum, p) => sum + p.avgDays * p.sampleSize,
    0
  ) / totalSampleSize;

const fastestLine = [...productLines].sort(
  (a, b) => a.avgDays - b.avgDays
)[0];

const longestLine = [...productLines].sort(
  (a, b) => b.avgDays - a.avgDays
)[0];

export default function AvgTrialDurationPage() {
  const [selectedLine, setSelectedLine] = useState<ProductLine>(
    productLines[0]
  );

  const selectedMarketDurations =
    marketDurations[selectedLine.id] ?? [];

  const maxDaysInList = Math.max(...productLines.map((p) => p.avgDays));

  const overUseRisk =
    selectedLine.longPct >= 40
      ? "過長試用比例偏高，需留意樣品被當作正品使用。"
      : selectedLine.longPct >= 25
      ? "部分消費者傾向延長試用期，可考慮設定提醒或轉換方案。"
      : "整體試用天數落在可控範圍，以觀察轉換率為主。";

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Link to="/" className="text-sm text-slate-500 underline">
        ← Back to Dashboard
      </Link>

      <h2 className="mt-4 text-2xl font-semibold mb-2">
        Avg Trial Duration – Detail
      </h2>
      <p className="text-slate-600 mb-8">
        檢視不同產品線的平均試用天數，對照建議試用區間與同業 benchmark，找出「太短看不到效果」與「太長不易轉換」的風險區。
      </p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {/* Global avg */}
        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-100">
            <Clock className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Global Avg Trial Duration
            </p>
            <p className="text-2xl font-semibold">
              {globalAvgDuration.toFixed(1)} days
            </p>
            <p className="text-xs text-slate-500 mt-1">
              以樣本數加權計算的平均試用天數
            </p>
          </div>
        </div>

        {/* Fastest line */}
        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-100">
            <Timer className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Fastest Line
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {fastestLine.name}
            </p>
            <p className="text-sm text-emerald-600">
              {fastestLine.avgDays.toFixed(1)} days ·{" "}
              {fastestLine.avgDays < fastestLine.industryAvg
                ? "略短於同業"
                : "接近同業"}
            </p>
          </div>
        </div>

        {/* Longest / over-use risk */}
        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-100">
            <BarChart3 className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Potential Over-Use Risk
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {longestLine.name}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              平均 {longestLine.avgDays.toFixed(1)} 天 · 同業{" "}
              {longestLine.industryAvg.toFixed(1)} 天，長期試用者比例
              {longestLine.longPct}%。
            </p>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Product line list */}
        <div className="rounded-2xl bg-white p-6 shadow-sm xl:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Product Line Comparison
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Filter className="w-3 h-3" />
              Click to select line
            </div>
          </div>

          <div className="space-y-3">
            {productLines.map((line) => {
              const isActive = line.id === selectedLine.id;
              const widthPercent = (line.avgDays / maxDaysInList) * 100;

              const diff = line.avgDays - line.industryAvg;
              const diffLabel =
                diff > 0
                  ? `+${diff.toFixed(1)} vs industry`
                  : `${diff.toFixed(1)} vs industry`;

              return (
                <button
                  key={line.id}
                  onClick={() => setSelectedLine(line)}
                  className={`w-full text-left rounded-xl border px-4 py-3 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-teal-50 to-purple-50 border-teal-200 shadow-sm"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="pr-2">
                      <p className="font-medium text-slate-800 truncate">
                        {line.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {line.sampleSize.toLocaleString()} trials ·{" "}
                        {diffLabel}
                      </p>
                    </div>
                    <p className="text-sm text-slate-800 whitespace-nowrap">
                      {line.avgDays.toFixed(1)} days
                    </p>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-teal-500"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Detail panel */}
        <div className="rounded-2xl bg-white p-6 shadow-sm xl:col-span-2 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                {selectedLine.name} – Trial Duration Insight
              </h3>
              <p className="text-sm text-slate-600">
                觀察此產品線的平均試用天數、與建議區間及同業 benchmark 的差距，用來調整樣品大小與跟進時間點。
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-500">Avg Trial Days</p>
                <p className="text-xl font-semibold text-slate-900">
                  {selectedLine.avgDays.toFixed(1)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Recommended Window</p>
                <p className="text-xl font-semibold text-emerald-600">
                  {selectedLine.idealMin}–{selectedLine.idealMax}d
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Industry Avg</p>
                <p className="text-xl font-semibold text-purple-600">
                  {selectedLine.industryAvg.toFixed(1)}d
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
              理想試用區間：{selectedLine.idealMin}–{selectedLine.idealMax} 天
            </span>
            <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
              同類產品業界平均：{selectedLine.industryAvg.toFixed(1)} 天
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              過長試用比例：{selectedLine.longPct}%
            </span>
          </div>

          {/* Distribution + market table */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
            {/* Distribution block */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-900">
                  Trial Length Distribution
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MousePointerClick className="w-4 h-4" />
                  用來說明「太短 / 剛好 / 太長」三段的比例
                </div>
              </div>

              <div className="space-y-4">
                {/* Too short */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">
                      Too Short (&lt; {selectedLine.idealMin} days)
                    </span>
                    <span className="text-slate-600">
                      {selectedLine.shortPct}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-sky-400 to-sky-500"
                      style={{ width: `${selectedLine.shortPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    可能尚未看到完整效果，可評估是否在第{" "}
                    {selectedLine.idealMin - 2}–{selectedLine.idealMin} 天
                    推播提醒或教學內容。
                  </p>
                </div>

                {/* Ideal */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">
                      Ideal Window ({selectedLine.idealMin}–
                      {selectedLine.idealMax} days)
                    </span>
                    <span className="text-slate-600">
                      {selectedLine.idealPct}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                      style={{ width: `${selectedLine.idealPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    建議在此區間安排「完成問卷 / 轉換購買」行銷節點，試用體驗與記憶最鮮明。
                  </p>
                </div>

                {/* Too long */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-slate-700">
                      Too Long (&gt; {selectedLine.idealMax} days)
                    </span>
                    <span className="text-slate-600">
                      {selectedLine.longPct}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-amber-400 to-rose-500"
                      style={{ width: `${selectedLine.longPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-500 mt-1">
                    {overUseRisk}
                  </p>
                </div>
              </div>
            </div>

            {/* Market comparison table */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <h4 className="text-sm font-semibold text-slate-900 mb-2">
                Market Comparison – Avg Trial Days
              </h4>
              <p className="text-xs text-slate-600 mb-3">
                不同市場的平均試用天數與同業 benchmark，比較當地消費者習慣與樣品策略是否一致。
              </p>

              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="border-b border-slate-200 text-slate-500">
                    <tr>
                      <th className="py-2 pr-4 text-left">Market</th>
                      <th className="py-2 px-4 text-right">
                        Brand Avg (days)
                      </th>
                      <th className="py-2 px-4 text-right">
                        Industry Avg (days)
                      </th>
                      <th className="py-2 pl-4 text-right">Gap</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedMarketDurations.map((m) => {
                      const diff = m.brandAvg - m.industryAvg;
                      const isAbove = diff > 0;

                      return (
                        <tr
                          key={m.market}
                          className="border-b border-slate-100 last:border-0"
                        >
                          <td className="py-3 pr-4 text-slate-800">
                            {m.market}
                          </td>
                          <td className="py-3 px-4 text-right tabular-nums">
                            {m.brandAvg.toFixed(1)}
                          </td>
                          <td className="py-3 px-4 text-right tabular-nums">
                            {m.industryAvg.toFixed(1)}
                          </td>
                          <td className="py-3 pl-4 text-right tabular-nums">
                            <span
                              className={
                                isAbove
                                  ? "text-amber-600"
                                  : "text-emerald-600"
                              }
                            >
                              {diff > 0 ? "+" : ""}
                              {diff.toFixed(1)}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                    {selectedMarketDurations.length === 0 && (
                      <tr>
                        <td
                          colSpan={4}
                          className="py-4 text-center text-slate-500 text-sm"
                        >
                          No market data configured for this line yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
