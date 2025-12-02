import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Globe,
  BarChart3,
  MousePointerClick,
  Filter,
} from "lucide-react";

type AgeGroup = {
  range: string;
  percent: number; // 該國內佔比 %
  avgScore: number;
};

type Country = {
  country: string;
  users: number;
  completionRate: number; // 完成率
  avgScore: number;       // TryMe Score
  ageGroups: AgeGroup[];  // 各國自己的年齡分布
};

// 各國都有「不同」的年齡分布指數
const countryData: Country[] = [
  {
    country: "Japan",
    users: 5320,
    completionRate: 91,
    avgScore: 8.8,
    ageGroups: [
      { range: "18-24", percent: 22, avgScore: 8.9 },
      { range: "25-34", percent: 38, avgScore: 8.8 },
      { range: "35-44", percent: 24, avgScore: 8.5 },
      { range: "45-54", percent: 11, avgScore: 8.1 },
      { range: "55+", percent: 5, avgScore: 7.8 },
    ],
  },
  {
    country: "Taiwan",
    users: 4120,
    completionRate: 88,
    avgScore: 8.5,
    ageGroups: [
      { range: "18-24", percent: 34, avgScore: 8.7 },
      { range: "25-34", percent: 33, avgScore: 8.6 },
      { range: "35-44", percent: 18, avgScore: 8.2 },
      { range: "45-54", percent: 9, avgScore: 7.9 },
      { range: "55+", percent: 6, avgScore: 7.4 },
    ],
  },
  {
    country: "United States",
    users: 2890,
    completionRate: 83,
    avgScore: 8.2,
    ageGroups: [
      { range: "18-24", percent: 26, avgScore: 8.4 },
      { range: "25-34", percent: 37, avgScore: 8.3 },
      { range: "35-44", percent: 21, avgScore: 8.1 },
      { range: "45-54", percent: 11, avgScore: 7.8 },
      { range: "55+", percent: 5, avgScore: 7.3 },
    ],
  },
  {
    country: "Singapore",
    users: 1980,
    completionRate: 89,
    avgScore: 8.6,
    ageGroups: [
      { range: "18-24", percent: 29, avgScore: 8.7 },
      { range: "25-34", percent: 39, avgScore: 8.6 },
      { range: "35-44", percent: 20, avgScore: 8.3 },
      { range: "45-54", percent: 8, avgScore: 7.9 },
      { range: "55+", percent: 4, avgScore: 7.5 },
    ],
  },
  {
    country: "Thailand",
    users: 1640,
    completionRate: 80,
    avgScore: 8.0,
    ageGroups: [
      { range: "18-24", percent: 40, avgScore: 8.3 },
      { range: "25-34", percent: 32, avgScore: 8.1 },
      { range: "35-44", percent: 16, avgScore: 7.9 },
      { range: "45-54", percent: 8, avgScore: 7.6 },
      { range: "55+", percent: 4, avgScore: 7.2 },
    ],
  },
  {
    country: "Hong Kong",
    users: 1430,
    completionRate: 84,
    avgScore: 8.1,
    ageGroups: [
      { range: "18-24", percent: 24, avgScore: 8.4 },
      { range: "25-34", percent: 35, avgScore: 8.3 },
      { range: "35-44", percent: 23, avgScore: 8.0 },
      { range: "45-54", percent: 11, avgScore: 7.7 },
      { range: "55+", percent: 7, avgScore: 7.3 },
    ],
  },
];

// 估算平均年齡（全體）
const getBaseAge = (range: string) =>
  range === "55+" ? 60 : parseInt(range.split("-")[0], 10);

const totalUsersAll = countryData.reduce((s, c) => s + c.users, 0);

const globalAvgAge = (() => {
  let weightedAgeSum = 0;
  let userSum = 0;

  countryData.forEach((c) => {
    c.ageGroups.forEach((g) => {
      const baseAge = getBaseAge(g.range);
      const usersInGroup = c.users * (g.percent / 100);
      weightedAgeSum += baseAge * usersInGroup;
      userSum += usersInGroup;
    });
  });

  return weightedAgeSum / userSum;
})();

const getTopAgeGroupLabel = (country: Country) => {
  const top = [...country.ageGroups].sort(
    (a, b) => b.percent - a.percent
  )[0];
  return top?.range ?? "-";
};

export default function UniqueUsersPage() {
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    countryData[0]
  );
  const [selectedAge, setSelectedAge] = useState<AgeGroup>(
    countryData[0].ageGroups[0]
  );
  const [ageViewMode, setAgeViewMode] = useState<"percent" | "users">(
    "percent"
  );

  const estimatedUsersForAge = (age: AgeGroup, country: Country) =>
    Math.round((age.percent / 100) * country.users);

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Link to="/" className="text-sm text-slate-500 underline">
        ← Back to Dashboard
      </Link>

      <h2 className="mt-4 text-2xl font-semibold mb-2">
        Unique Users – Detail
      </h2>
      <p className="text-slate-600 mb-8">
        分析各國家與年齡層的試用者分布。每個市場都有不同的年齡指數與 TryMe
        Score，用來協助品牌做在地化決策。
      </p>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
        {/* Total Users */}
        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-violet-100">
            <Users className="w-6 h-6 text-violet-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Total Users
            </p>
            <p className="text-2xl font-semibold">
              {totalUsersAll.toLocaleString()}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              所有市場累計參與試用的獨立使用者
            </p>
          </div>
        </div>

        {/* Markets */}
        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-teal-100">
            <Globe className="w-6 h-6 text-teal-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Markets
            </p>
            <p className="text-2xl font-semibold">{countryData.length}</p>
            <p className="text-xs text-slate-500 mt-1">
              已啟用 TryMePack 試用追蹤的市場數量
            </p>
          </div>
        </div>

        {/* Avg Age (Global) */}
        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-100">
            <BarChart3 className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Est. Avg Age
            </p>
            <p className="text-2xl font-semibold">
              {Math.round(globalAvgAge)}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              依各市場年齡層分布加權推估的全球平均年齡
            </p>
          </div>
        </div>

        {/* Interaction Hint */}
        <div className="rounded-2xl bg-white p-5 shadow-sm flex items-start gap-4">
          <div className="p-3 rounded-xl bg-sky-100">
            <MousePointerClick className="w-6 h-6 text-sky-600" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-500">
              Interaction Tips
            </p>
            <p className="text-sm text-slate-700">
              點選左側國家可檢視該市場的完成率與年齡分布；點選下方年齡層可查看估計人數與
              TryMe Score。
            </p>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Country list */}
        <div className="rounded-2xl bg-white p-6 shadow-sm xl:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Country Distribution
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Filter className="w-3 h-3" />
              Click to select a market
            </div>
          </div>

          <div className="space-y-3">
            {countryData.map((c) => {
              const isActive = c.country === selectedCountry.country;
              const share = (c.users / totalUsersAll) * 100;

              return (
                <button
                  key={c.country}
                  onClick={() => {
                    setSelectedCountry(c);
                    setSelectedAge(c.ageGroups[0]); // 切換國家時，年齡段也重設
                  }}
                  className={`w-full text-left rounded-xl border px-4 py-3 transition-all ${isActive
                      ? "bg-gradient-to-r from-teal-50 to-purple-50 border-teal-200 shadow-sm"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                    }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div>
                      <p className="font-medium text-slate-800">
                        {c.country}
                      </p>
                      <p className="text-xs text-slate-500">
                        {c.users.toLocaleString()} users ·{" "}
                        {share.toFixed(1)}% of total
                      </p>
                    </div>
                    <p className="text-sm text-slate-700">
                      {c.completionRate}% completion
                    </p>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-teal-500 to-purple-500"
                      style={{
                        width: `${(c.users / countryData[0].users) * 100
                          }%`,
                      }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right side: selected country + age groups */}
        <div className="rounded-2xl bg-white p-6 shadow-sm xl:col-span-2 flex flex-col gap-6">
          {/* Country header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                {selectedCountry.country} – Market Insight
              </h3>
              <p className="text-sm text-slate-600">
                觀察此市場的試用者規模、完成率與主要年齡層，協助品牌調整溝通與投放策略。
              </p>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-500">Users</p>
                <p className="text-xl font-semibold text-slate-900">
                  {selectedCountry.users.toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Completion Rate</p>
                <p className="text-xl font-semibold text-emerald-600">
                  {selectedCountry.completionRate}%
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Avg TryMe Score</p>
                <p className="text-xl font-semibold text-purple-600">
                  {selectedCountry.avgScore.toFixed(1)}
                </p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            <span className="inline-flex items-center rounded-full bg-teal-50 px-3 py-1 text-xs font-medium text-teal-700">
              主力年齡層：{getTopAgeGroupLabel(selectedCountry)}
            </span>
            <span className="inline-flex items-center rounded-full bg-violet-50 px-3 py-1 text-xs font-medium text-violet-700">
              完成率：{selectedCountry.completionRate}%（含回饋者）
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
              TryMe Score 高於全球平均{" "}
              {(selectedCountry.avgScore - 8.3).toFixed(1)}
            </span>
          </div>

          {/* Age group area */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
            {/* Age bars */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-900">
                  Age Group Breakdown
                </h4>
                <div className="flex items-center gap-2 text-xs">
                  <span
                    onClick={() => setAgeViewMode("percent")}
                    className={`cursor-pointer rounded-full px-2 py-1 ${ageViewMode === "percent"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    %
                  </span>
                  <span
                    onClick={() => setAgeViewMode("users")}
                    className={`cursor-pointer rounded-full px-2 py-1 ${ageViewMode === "users"
                        ? "bg-slate-900 text-white"
                        : "bg-slate-100 text-slate-600"
                      }`}
                  >
                    Users
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {selectedCountry.ageGroups.map((age) => {
                  const active = age.range === selectedAge.range;
                  const value =
                    ageViewMode === "percent"
                      ? `${age.percent}%`
                      : `${estimatedUsersForAge(
                        age,
                        selectedCountry
                      ).toLocaleString()} users`;

                  return (
                    <button
                      key={age.range}
                      onClick={() => setSelectedAge(age)}
                      className={`w-full text-left rounded-xl px-3 py-2 transition-all ${active
                          ? "bg-gradient-to-r from-purple-50 to-teal-50"
                          : "bg-slate-50 hover:bg-slate-100"
                        }`}
                    >
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">
                          {age.range}
                        </span>
                        <span className="text-slate-600">{value}</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-200 rounded-full">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-teal-500"
                          style={{ width: `${age.percent}%` }}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected age detail */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <h4 className="text-sm font-semibold text-slate-900 mb-2">
                Segment Insight – {selectedAge.range}（
                {selectedCountry.country}）
              </h4>
              <p className="text-sm text-slate-700 mb-3">
                在 {selectedCountry.country}，這個年齡層約佔所有試用者的{" "}
                <span className="font-semibold">
                  {selectedAge.percent}%
                </span>
                ，推估約{" "}
                <span className="font-semibold">
                  {estimatedUsersForAge(
                    selectedAge,
                    selectedCountry
                  ).toLocaleString()} 人
                </span>
                。平均 TryMe Score 為{" "}
                <span className="font-semibold">
                  {selectedAge.avgScore.toFixed(1)}
                </span>
                ，適合作為主要溝通對象或深度培育族群。
              </p>
              <ul className="text-xs text-slate-600 list-disc list-inside space-y-1">
                <li>
                  可搭配{" "}
                  {selectedAge.range === "18-24"
                    ? "社群短影音與互動活動"
                    : selectedAge.range === "25-34"
                      ? "多平台內容與會員體驗計畫"
                      : "深度保養教育內容與線下體驗活動"}
                  ，提升回饋填寫率與回購意願。
                </li>
                <li>
                  建議在品牌後台進一步查看此族群偏好的產品線與關鍵字，作為下一季 campaign
                  的 insight。
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
