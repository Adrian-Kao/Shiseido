// src/components/ActivityTimeline.tsx
import React from "react";
import { Activity } from "lucide-react";

type MonthData = {
  month: string;
  trials: number;        // 成長率（%）
  tryMe: number;         // 成長率（%）
  satisfaction: number;  // 成長率（%）
  repurchase: number;    // 成長率（%）
};

const monthlyData: MonthData[] = [
  { month: "Jan", trials: 4,  tryMe: 1.2, satisfaction: 0.8, repurchase: 1.0 },
  { month: "Feb", trials: 6,  tryMe: 1.5, satisfaction: 1.1, repurchase: 1.4 },
  { month: "Mar", trials: 9,  tryMe: 2.1, satisfaction: 1.8, repurchase: 2.2 },
  { month: "Apr", trials: 7,  tryMe: 1.9, satisfaction: 1.5, repurchase: 1.8 },
  { month: "May", trials: 11, tryMe: 2.4, satisfaction: 2.0, repurchase: 2.7 },
  { month: "Jun", trials: 13, tryMe: 2.8, satisfaction: 2.4, repurchase: 3.1 },
  { month: "Jul", trials: 10, tryMe: 2.2, satisfaction: 2.0, repurchase: 2.5 },
  { month: "Aug", trials: 8,  tryMe: 1.7, satisfaction: 1.6, repurchase: 2.0 },
  { month: "Sep", trials: 12, tryMe: 2.6, satisfaction: 2.3, repurchase: 3.0 },
  { month: "Oct", trials: 15, tryMe: 3.1, satisfaction: 2.8, repurchase: 3.6 },
  { month: "Nov", trials: 14, tryMe: 3.0, satisfaction: 2.6, repurchase: 3.4 },
  { month: "Dec", trials: 16, tryMe: 3.4, satisfaction: 3.0, repurchase: 3.9 },
];

const chartHeight = 140;
const chartWidth = 600;

function buildPath(
  data: MonthData[],
  key: keyof MonthData,
  maxValue: number
): string {
  const points = data.map((d, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const value = d[key] as number;
    const y = chartHeight - (value / maxValue) * chartHeight;
    return `${x},${y}`;
  });

  return points.length ? `M ${points.join(" L ")}` : "";
}

function ActivityTimeline() {
  // 四條線的最大值一起算，讓比例一致
  const maxValue = Math.max(
    ...monthlyData.flatMap((d) => [
      d.trials,
      d.tryMe,
      d.satisfaction,
      d.repurchase,
    ])
  );

  const trialsPath = buildPath(monthlyData, "trials", maxValue);
  const tryMePath = buildPath(monthlyData, "tryMe", maxValue);
  const satisfactionPath = buildPath(monthlyData, "satisfaction", maxValue);
  const repurchasePath = buildPath(monthlyData, "repurchase", maxValue);

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-400/15 via-purple-400/15 to-teal-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
      <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-400 to-teal-500 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Activity Timeline
              </h2>
              <p className="text-slate-600 text-sm">
                Monthly growth trends across key KPIs
              </p>
            </div>
          </div>
          <div className="hidden md:flex gap-6 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-violet-500" />
              Trials
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500" />
              TryMe Score
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-sky-500" />
              Satisfaction
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500" />
              Repurchase
            </div>
          </div>
        </div>

        {/* 折線圖 */}
        <div className="w-full overflow-x-auto pb-4">
          <div className="min-w-[720px]">
            <div className="h-56 relative">
              {/* 背景格線 */}
              <div className="absolute inset-0 flex flex-col justify-between text-[10px] text-slate-300">
                {[0, 0.25, 0.5, 0.75, 1].map((r) => (
                  <div key={r} className="flex items-center gap-2">
                    <span className="w-8 text-right">
                      {Math.round(maxValue * r)}%
                    </span>
                    <div className="flex-1 border-t border-dashed border-slate-200" />
                  </div>
                ))}
              </div>

              <svg
                viewBox={`0 0 ${chartWidth} ${chartHeight}`}
                className="relative z-10 w-full h-full"
              >
                {/* Trials */}
                <path
                  d={trialsPath}
                  fill="none"
                  stroke="url(#trialsGradient)"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                />
                {/* TryMe */}
                <path
                  d={tryMePath}
                  fill="none"
                  stroke="url(#trymeGradient)"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                {/* Satisfaction */}
                <path
                  d={satisfactionPath}
                  fill="none"
                  stroke="url(#satisGradient)"
                  strokeWidth={2}
                  strokeLinecap="round"
                />
                {/* Repurchase */}
                <path
                  d={repurchasePath}
                  fill="none"
                  stroke="url(#repuGradient)"
                  strokeWidth={2}
                  strokeLinecap="round"
                />

                {/* 線條用的漸層定義 */}
                <defs>
                  <linearGradient
                    id="trialsGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#8b5cf6" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                  <linearGradient id="trymeGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#22c55e" />
                  </linearGradient>
                  <linearGradient
                    id="satisGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#0ea5e9" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                  <linearGradient
                    id="repuGradient"
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="0"
                  >
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f97316" />
                  </linearGradient>
                </defs>

                {/* 每個月的點 */}
                {monthlyData.map((d, idx) => {
                  const x = (idx / (monthlyData.length - 1)) * chartWidth;

                  const trialsY =
                    chartHeight - (d.trials / maxValue) * chartHeight;
                  const tryMeY =
                    chartHeight - (d.tryMe / maxValue) * chartHeight;
                  const satisY =
                    chartHeight - (d.satisfaction / maxValue) * chartHeight;
                  const repuY =
                    chartHeight - (d.repurchase / maxValue) * chartHeight;

                  return (
                    <g key={d.month}>
                      <circle
                        cx={x}
                        cy={trialsY}
                        r={3}
                        fill="#8b5cf6"
                        opacity={0.9}
                      />
                      <circle
                        cx={x}
                        cy={tryMeY}
                        r={2.5}
                        fill="#10b981"
                        opacity={0.9}
                      />
                      <circle
                        cx={x}
                        cy={satisY}
                        r={2.5}
                        fill="#0ea5e9"
                        opacity={0.9}
                      />
                      <circle
                        cx={x}
                        cy={repuY}
                        r={2.5}
                        fill="#f59e0b"
                        opacity={0.9}
                      />
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* 月份標籤 */}
            <div className="mt-3 flex justify-between text-[11px] text-slate-500 px-8">
              {monthlyData.map((d) => (
                <span key={d.month}>{d.month}</span>
              ))}
            </div>
          </div>
        </div>

        {/* 簡短說明區，可在簡報時講解成長重點 */}
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
          <div className="rounded-xl bg-violet-50 px-3 py-2">
            <p className="text-violet-600 font-semibold mb-1">Trials</p>
            <p className="text-slate-600">
              持續穩定成長，Q4 受節慶活動帶動最高。
            </p>
          </div>
          <div className="rounded-xl bg-emerald-50 px-3 py-2">
            <p className="text-emerald-600 font-semibold mb-1">TryMe Score</p>
            <p className="text-slate-600">
              使用體驗優化後，月度滿意度評分呈現緩步上升。
            </p>
          </div>
          <div className="rounded-xl bg-sky-50 px-3 py-2">
            <p className="text-sky-600 font-semibold mb-1">Satisfaction</p>
            <p className="text-slate-600">
              4–6 月調整配方包裝後，回饋分數明顯向上。
            </p>
          </div>
          <div className="rounded-xl bg-amber-50 px-3 py-2">
            <p className="text-amber-600 font-semibold mb-1">Repurchase</p>
            <p className="text-slate-600">
              年底搭配會員活動，回購意向成長幅度最大。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityTimeline;
