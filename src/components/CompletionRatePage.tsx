// src/components/CompletionRatePage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Filter,
  MousePointerClick,
  Activity,
  Percent,
} from "lucide-react";

type Channel = {
  id: string;
  name: string;
  completionRate: number; // 最終完成率
  trials: number;
  surveyOpened: number;
  surveyCompleted: number;
  repurchaseLogged: number;
};

type Campaign = {
  channelId: string;
  name: string;
  market: string;
  completionRate: number;
  participants: number;
};

const channels: Channel[] = [
  {
    id: "online",
    name: "Online Sampling",
    completionRate: 92,
    trials: 8200,
    surveyOpened: 7600,
    surveyCompleted: 7050,
    repurchaseLogged: 4100,
  },
  {
    id: "counter",
    name: "In-store Counter",
    completionRate: 84,
    trials: 6100,
    surveyOpened: 5200,
    surveyCompleted: 4800,
    repurchaseLogged: 2600,
  },
  {
    id: "popup",
    name: "Pop-up Event",
    completionRate: 78,
    trials: 4200,
    surveyOpened: 3600,
    surveyCompleted: 3300,
    repurchaseLogged: 1600,
  },
];

const campaigns: Campaign[] = [
  {
    channelId: "online",
    name: "E-commerce Gift with Purchase",
    market: "Japan",
    completionRate: 94,
    participants: 2400,
  },
  {
    channelId: "online",
    name: "Social Media Sampling Form",
    market: "Taiwan",
    completionRate: 89,
    participants: 1850,
  },
  {
    channelId: "online",
    name: "Skincare Routine Quiz",
    market: "Singapore",
    completionRate: 90,
    participants: 1260,
  },
  {
    channelId: "counter",
    name: "Counter Skin Check Program",
    market: "Japan",
    completionRate: 86,
    participants: 2100,
  },
  {
    channelId: "counter",
    name: "Department Store Anniversary",
    market: "Hong Kong",
    completionRate: 82,
    participants: 1650,
  },
  {
    channelId: "counter",
    name: "VIP Facial Experience",
    market: "Taiwan",
    completionRate: 88,
    participants: 1050,
  },
  {
    channelId: "popup",
    name: "Mall Pop-up Discovery Booth",
    market: "Thailand",
    completionRate: 76,
    participants: 1500,
  },
  {
    channelId: "popup",
    name: "Festival Beauty Truck",
    market: "Japan",
    completionRate: 80,
    participants: 1200,
  },
  {
    channelId: "popup",
    name: "Campus Trial Tour",
    market: "Taiwan",
    completionRate: 79,
    participants: 950,
  },
];

function calcOverallCompletion() {
  const totalTrials = channels.reduce((s, c) => s + c.trials, 0);
  const totalCompleted = channels.reduce((s, c) => s + c.surveyCompleted, 0);
  return Math.round((totalCompleted / totalTrials) * 100);
}

function getLargestDropoffStep(channel: Channel) {
  const step1Drop = 1 - channel.surveyOpened / channel.trials;
  const step2Drop = 1 - channel.surveyCompleted / channel.surveyOpened;
  const step3Drop = 1 - channel.repurchaseLogged / channel.surveyCompleted;

  const maxDrop = Math.max(step1Drop, step2Drop, step3Drop);

  if (maxDrop === step1Drop) return "Trial → Survey Opened";
  if (maxDrop === step2Drop) return "Survey Opened → Survey Completed";
  return "Survey Completed → Repurchase Intent";
}

function CompletionRatePage() {
  const [selectedChannel, setSelectedChannel] = useState<Channel>(channels[0]);
  const overallCompletion = calcOverallCompletion();
  const bestChannel = [...channels].sort(
    (a, b) => b.completionRate - a.completionRate
  )[0];

  const selectedCampaigns = campaigns.filter(
    (c) => c.channelId === selectedChannel.id
  );

  const steps = [
    {
      label: "Trial Started",
      value: selectedChannel.trials,
    },
    {
      label: "Survey Opened",
      value: selectedChannel.surveyOpened,
    },
    {
      label: "Survey Completed",
      value: selectedChannel.surveyCompleted,
    },
    {
      label: "Repurchase Intent Logged",
      value: selectedChannel.repurchaseLogged,
    },
  ];

  const maxStepValue = steps[0].value;

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Link to="/" className="text-sm text-slate-500 underline">
        ← Back to Dashboard
      </Link>

      <h2 className="mt-4 text-2xl font-semibold mb-2">
        Completion Rate – Detail
      </h2>
      <p className="text-slate-600 mb-8">
        檢視不同活動／渠道在試用流程各階段的完成率與流失位置，協助品牌優化問卷設計與跟進策略。
      </p>

      {/* Summary cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
        {/* Overall completion */}
        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-100">
            <Percent className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Overall Completion
            </p>
            <p className="text-2xl font-semibold text-emerald-700">
              {overallCompletion}%
            </p>
            <p className="text-xs text-slate-500 mt-1">
              所有渠道平均問卷完成率
            </p>
          </div>
        </div>

        {/* Best channel */}
        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-100">
            <BarChart3 className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Best Performing Channel
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {bestChannel.name}
            </p>
            <p className="text-sm text-emerald-600">
              {bestChannel.completionRate}% completion
            </p>
          </div>
        </div>

        {/* Largest dropoff in selected channel */}
        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-xl bg-amber-100">
            <Activity className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Key Drop-off (Selected Channel)
            </p>
            <p className="text-sm font-semibold text-slate-900">
              {getLargestDropoffStep(selectedChannel)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              目前 {selectedChannel.name} 在此階段流失較多使用者，適合優化提醒與 UX。
            </p>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Channel list */}
        <div className="rounded-2xl bg-white p-6 shadow-sm xl:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Channel Comparison
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Filter className="w-3 h-3" />
              Click to select channel
            </div>
          </div>

          <div className="space-y-3">
            {channels.map((ch) => {
              const isActive = ch.id === selectedChannel.id;

              return (
                <button
                  key={ch.id}
                  onClick={() => setSelectedChannel(ch)}
                  className={`w-full text-left rounded-xl border px-4 py-3 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-teal-50 to-purple-50 border-teal-200 shadow-sm"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <p className="font-medium text-slate-800">{ch.name}</p>
                      <p className="text-xs text-slate-500">
                        {ch.trials.toLocaleString()} trials started
                      </p>
                    </div>
                    <p className="text-sm text-emerald-600">
                      {ch.completionRate}% completed
                    </p>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-teal-500 to-purple-500"
                      style={{ width: `${ch.completionRate}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Funnel + campaign table */}
        <div className="rounded-2xl bg-white p-6 shadow-sm xl:col-span-2 flex flex-col gap-6">
          {/* Funnel header */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">
                {selectedChannel.name} – Completion Funnel
              </h3>
              <p className="text-sm text-slate-600">
                追蹤此渠道在試用到回購意向各階段的人數變化。
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <MousePointerClick className="w-4 h-4" />
              Hover 數字可在簡報時講解關鍵流失點
            </div>
          </div>

          {/* Funnel steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
            {steps.map((step, index) => {
              const widthPercent = (step.value / maxStepValue) * 100;
              return (
                <div
                  key={step.label}
                  className="rounded-2xl bg-slate-50 border border-slate-100 p-4 flex flex-col gap-2"
                >
                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    Step {index + 1}
                  </p>
                  <p className="text-sm font-semibold text-slate-900">
                    {step.label}
                  </p>
                  <p className="text-lg font-semibold text-slate-800">
                    {step.value.toLocaleString()}
                  </p>
                  <div className="h-1.5 w-full bg-slate-200 rounded-full">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-teal-500"
                      style={{ width: `${widthPercent}%` }}
                    />
                  </div>
                  {index > 0 && (
                    <p className="text-[11px] text-slate-500">
                      Retention from previous step:{" "}
                      {Math.round(
                        (step.value / steps[index - 1].value) * 100
                      )}
                      %
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Campaign table */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-slate-900">
                Campaign Performance – {selectedChannel.name}
              </h4>
              <p className="text-xs text-slate-500">
                顯示此渠道底下不同活動的完成率與參與人數
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="border-b border-slate-200 text-slate-500">
                  <tr>
                    <th className="py-2 pr-4 text-left">Campaign</th>
                    <th className="py-2 px-4 text-left">Market</th>
                    <th className="py-2 px-4 text-right">Participants</th>
                    <th className="py-2 px-4 text-right">Completion Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedCampaigns.map((cp) => (
                    <tr
                      key={cp.name}
                      className="border-b border-slate-100 last:border-0"
                    >
                      <td className="py-3 pr-4">
                        <span className="font-medium text-slate-900">
                          {cp.name}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">
                        {cp.market}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums">
                        {cp.participants.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-right tabular-nums">
                        {cp.completionRate}%
                      </td>
                    </tr>
                  ))}
                  {selectedCampaigns.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="py-4 text-center text-slate-500 text-sm"
                      >
                        No campaigns recorded for this channel yet.
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
  );
}

export default CompletionRatePage;
