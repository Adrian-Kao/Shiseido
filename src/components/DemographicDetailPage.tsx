// src/components/DemographicsDetailPage.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    Users,
    MapPin,
    Droplets,
    AlertTriangle,
    Sparkles,
    TrendingUp,
    Filter,
} from "lucide-react";

type AgeGroupInsight = {
    range: string;
    percent: number;
    tryMeScore: number;
    completionRate: number;
    topConcern: string;
    topProduct: string;
};

type RegionInsight = {
    region: string;
    percent: number;
    trials: number;
    completionRate: number;
    growth: number;
    topProduct: string;
};

type SkinTypeInsight = {
    type: string;
    percent: number;
    avgSatisfaction: number;
    topConcern: string;
};

type ConcernInsight = {
    concern: string;
    percent: number;
};

type Persona = {
    id: string;
    name: string;
    label: string;
    share: number;
    ageRange: string;
    skinTypes: string;
    keyConcerns: string[];
    favProducts: string[];
    quote: string;
};

// ---------------- 假資料 ----------------

const ageGroups: AgeGroupInsight[] = [
    {
        range: "18–24",
        percent: 18,
        tryMeScore: 8.4,
        completionRate: 82,
        topConcern: "油光 / 痘痘",
        topProduct: "Gentle Clean Foam",
    },
    {
        range: "25–34",
        percent: 34,
        tryMeScore: 8.9,
        completionRate: 88,
        topConcern: "保濕 / 暗沉",
        topProduct: "Hydra Glow Serum",
    },
    {
        range: "35–44",
        percent: 28,
        tryMeScore: 8.7,
        completionRate: 86,
        topConcern: "細紋 / 彈性",
        topProduct: "Youth Revival Cream",
    },
    {
        range: "45–54",
        percent: 15,
        tryMeScore: 8.5,
        completionRate: 84,
        topConcern: "鬆弛 / 暗沉",
        topProduct: "Radiance Boost Mask",
    },
    {
        range: "55+",
        percent: 5,
        tryMeScore: 8.1,
        completionRate: 80,
        topConcern: "乾燥 / 脆弱感",
        topProduct: "Vitamin C Brightener",
    },
];

const regions: RegionInsight[] = [
    {
        region: "North America",
        percent: 42,
        trials: 9800,
        completionRate: 86,
        growth: 12,
        topProduct: "Hydra Glow Serum",
    },
    {
        region: "Europe",
        percent: 31,
        trials: 7200,
        completionRate: 84,
        growth: 7,
        topProduct: "Youth Revival Cream",
    },
    {
        region: "Asia Pacific",
        percent: 19,
        trials: 5100,
        completionRate: 90,
        growth: 15,
        topProduct: "Silky Deep Cleansing Oil",
    },
    {
        region: "Other",
        percent: 8,
        trials: 2100,
        completionRate: 81,
        growth: 4,
        topProduct: "Gentle Clean Foam",
    },
];

const skinTypes: SkinTypeInsight[] = [
    {
        type: "Combination",
        percent: 35,
        avgSatisfaction: 8.7,
        topConcern: "T-zone 油光、兩頰乾燥",
    },
    {
        type: "Oily",
        percent: 28,
        avgSatisfaction: 8.5,
        topConcern: "出油、粉刺、毛孔粗大",
    },
    {
        type: "Dry",
        percent: 22,
        avgSatisfaction: 8.9,
        topConcern: "脫屑、緊繃、細紋",
    },
    {
        type: "Sensitive",
        percent: 15,
        avgSatisfaction: 8.6,
        topConcern: "泛紅、刺痛感",
    },
];

const concerns: ConcernInsight[] = [
    { concern: "Dryness · 乾燥", percent: 41 },
    { concern: "Dullness · 暗沉", percent: 27 },
    { concern: "Acne / Blemishes · 痘痘", percent: 22 },
    { concern: "Fine Lines · 細紋", percent: 18 },
    { concern: "Sensitivity · 敏感", percent: 16 },
    { concern: "Uneven Tone · 膚色不均", percent: 14 },
    { concern: "Pores · 毛孔粗大", percent: 11 },
];

const personas: Persona[] = [
    {
        id: "hydration-seeker",
        name: "Hydration Seeker",
        label: "保濕追求者",
        share: 34,
        ageRange: "25–34",
        skinTypes: "Dry / Combination",
        keyConcerns: ["乾燥", "妝感卡粉", "暗沉"],
        favProducts: ["Hydra Glow Serum", "Gentle Clean Foam"],
        quote: "「我希望底妝一整天都不要卡粉、不要脫屑。」",
    },
    {
        id: "antiaging-explorer",
        name: "Anti-aging Explorer",
        label: "初階抗老族",
        share: 28,
        ageRange: "35–44",
        skinTypes: "Combination",
        keyConcerns: ["細紋", "彈性", "法令紋"],
        favProducts: ["Youth Revival Cream", "Radiance Boost Mask"],
        quote: "「想開始認真抗老，但不想要太厚重或黏膩。」",
    },
    {
        id: "clean-beauty-minimalist",
        name: "Clean Beauty Minimalist",
        label: "清爽極簡派",
        share: 22,
        ageRange: "18–24",
        skinTypes: "Oily / Combination",
        keyConcerns: ["出油", "粉刺", "毛孔"],
        favProducts: ["Gentle Clean Foam", "Silky Deep Cleansing Oil"],
        quote: "「步驟越少越好，只要清爽、好吸收、不卡痘就行。」",
    },
];

// 拿來做 Summary card 用的小工具
const topAgeGroup = ageGroups.reduce((a, b) =>
    a.percent > b.percent ? a : b
);
const topRegionGrowth = regions.reduce((a, b) =>
    a.growth > b.growth ? a : b
);
const topSkinType = skinTypes.reduce((a, b) =>
    a.percent > b.percent ? a : b
);

function DemographicsDetailPage() {
    const [personaView, setPersonaView] = useState<"all" | string>("all");

    const filteredPersonas =
        personaView === "all"
            ? personas
            : personas.filter((p) => p.id === personaView);

    return (
        <div className="min-h-screen bg-slate-50 p-8">
            <Link to="/" className="text-sm text-slate-500 underline">
                ← Back to Dashboard
            </Link>

            <h2 className="mt-4 text-2xl font-semibold mb-2">Demographics – Detail</h2>
            <p className="text-slate-600 mb-8 max-w-3xl">
                更深入檢視使用者輪廓：包含年齡層、地區、膚質與主要肌膚困擾，
                以及由資料歸納出的 Persona，協助品牌決定溝通語氣與產品重點。
            </p>

            {/* Summary cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                {/* Top Age Group */}
                <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-violet-100">
                        <Users className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            Top Age Group
                        </p>
                        <p className="text-lg font-semibold text-slate-900">
                            {topAgeGroup.range}
                        </p>
                        <p className="text-sm text-slate-600">
                            佔比 {topAgeGroup.percent}% · Completion{" "}
                            <span className="text-emerald-600">
                                {topAgeGroup.completionRate}%
                            </span>
                        </p>
                    </div>
                </div>

                {/* Fastest Growing Region */}
                <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-sky-100">
                        <MapPin className="w-6 h-6 text-sky-600" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            Fastest Growing Region
                        </p>
                        <p className="text-lg font-semibold text-slate-900">
                            {topRegionGrowth.region}
                        </p>
                        <p className="text-sm text-slate-600">
                            Trials {topRegionGrowth.trials.toLocaleString()} ·{" "}
                            <span className="text-emerald-600">
                                +{topRegionGrowth.growth}% MoM
                            </span>
                        </p>
                    </div>
                </div>

                {/* Dominant Skin Type */}
                <div className="rounded-2xl bg-white p-5 shadow-sm flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-teal-100">
                        <Droplets className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-wide text-slate-500">
                            Dominant Skin Type
                        </p>
                        <p className="text-lg font-semibold text-slate-900">
                            {topSkinType.type}
                        </p>
                        <p className="text-sm text-slate-600">
                            {topSkinType.percent}% of users · Satisfaction{" "}
                            <span className="text-emerald-600">
                                {topSkinType.avgSatisfaction.toFixed(1)}/10
                            </span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Age + Skin type panels */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                {/* Age Breakdown */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                Age Breakdown
                            </h3>
                            <p className="text-sm text-slate-600">
                                不同年齡層的占比、TryMe Score 與完成率。
                            </p>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-500">
                            <Filter className="w-3 h-3" />
                            All users
                        </div>
                    </div>

                    <div className="space-y-4">
                        {ageGroups.map((age) => (
                            <div
                                key={age.range}
                                className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-semibold text-slate-900">
                                            {age.range}
                                        </span>
                                        <span className="text-xs text-slate-500">
                                            {age.percent}% of users
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs">
                                        <span className="text-slate-500">
                                            TryMe{" "}
                                            <span className="text-slate-900 font-semibold">
                                                {age.tryMeScore.toFixed(1)}
                                            </span>
                                        </span>
                                        <span className="text-slate-500">
                                            Completion{" "}
                                            <span className="text-emerald-600 font-semibold">
                                                {age.completionRate}%
                                            </span>
                                        </span>
                                    </div>
                                </div>

                                {/* 占比條 */}
                                <div className="h-2 w-full bg-slate-200 rounded-full mb-2">
                                    <div
                                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-teal-500"
                                        style={{ width: `${age.percent}%` }}
                                    />
                                </div>

                                <div className="flex justify-between text-[11px] text-slate-600">
                                    <span>Top concern：{age.topConcern}</span>
                                    <span>Top product：{age.topProduct}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skin Type Breakdown */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                Skin Type Breakdown
                            </h3>
                            <p className="text-sm text-slate-600">
                                各膚質占比與滿意度，適合用來設計差異化訊息。
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {skinTypes.map((s) => (
                            <div
                                key={s.type}
                                className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-500 to-teal-500" />
                                        <span className="text-sm font-semibold text-slate-900">
                                            {s.type}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs">
                                        <span className="text-slate-500">
                                            Users{" "}
                                            <span className="font-semibold text-slate-900">
                                                {s.percent}%
                                            </span>
                                        </span>
                                        <span className="text-slate-500">
                                            Satisfaction{" "}
                                            <span className="font-semibold text-emerald-600">
                                                {s.avgSatisfaction.toFixed(1)}/10
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="h-2 w-full bg-slate-200 rounded-full mb-2">
                                    <div
                                        className="h-2 rounded-full bg-gradient-to-r from-teal-500 to-purple-500"
                                        style={{ width: `${s.percent}%` }}
                                    />
                                </div>
                                <p className="text-[11px] text-slate-600">
                                    Key concern：{s.topConcern}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Region + Concerns */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
                {/* Region */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                Geographic Insights
                            </h3>
                            <p className="text-sm text-slate-600">
                                不同地區的試用量、完成率與成長率。
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {regions.map((r) => (
                            <div
                                key={r.region}
                                className="rounded-xl border border-slate-100 bg-slate-50/60 p-3"
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                                        <span className="text-sm font-semibold text-slate-900">
                                            {r.region}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-xs text-slate-500">
                                        <span>
                                            Users{" "}
                                            <span className="font-semibold text-slate-900">
                                                {r.percent}%
                                            </span>
                                        </span>
                                        <span>
                                            Completion{" "}
                                            <span className="font-semibold text-emerald-600">
                                                {r.completionRate}%
                                            </span>
                                        </span>
                                        <span>
                                            Growth{" "}
                                            <span
                                                className={
                                                    r.growth >= 0
                                                        ? "font-semibold text-emerald-600"
                                                        : "font-semibold text-rose-600"
                                                }
                                            >
                                                {r.growth >= 0 ? "+" : ""}
                                                {r.growth}%
                                            </span>
                                        </span>
                                    </div>
                                </div>
                                <div className="h-2 w-full bg-slate-200 rounded-full mb-2">
                                    <div
                                        className="h-2 rounded-full bg-gradient-to-r from-sky-500 to-teal-500"
                                        style={{ width: `${r.percent}%` }}
                                    />
                                </div>
                                <p className="text-[11px] text-slate-600">
                                    Top product：{r.topProduct} · Trials{" "}
                                    {r.trials.toLocaleString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Concerns */}
                <div className="rounded-2xl bg-white p-6 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-lg font-semibold text-slate-900">
                                Skin Concerns Distribution
                            </h3>
                            <p className="text-sm text-slate-600">
                                使用者最常提到的肌膚困擾，可作為產品溝通的主題方向。
                            </p>
                        </div>
                        <AlertTriangle className="w-5 h-5 text-amber-500" />
                    </div>

                    <div className="space-y-3">
                        {concerns.map((c) => (
                            <div key={c.concern}>
                                <div className="flex items-center justify-between text-xs mb-1">
                                    <span className="text-slate-700">{c.concern}</span>
                                    <span className="font-semibold text-slate-900">
                                        {c.percent}%
                                    </span>
                                </div>
                                <div className="h-2 w-full bg-slate-200 rounded-full">
                                    <div
                                        className="h-2 rounded-full bg-gradient-to-r from-rose-500 to-purple-500"
                                        style={{ width: `${c.percent}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Personas */}
            <div className="rounded-2xl bg-white p-6 shadow-sm mb-10">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-900">
                            User Personas
                        </h3>
                        <p className="text-sm text-slate-600">
                            依據年齡、膚質與回饋文字歸納的使用者角色，適合用來規劃行銷 Campaign
                            與溝通語氣。
                        </p>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Sparkles className="w-4 h-4 text-purple-500" />
                        AI-generated view
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-4 text-xs">
                    <button
                        onClick={() => setPersonaView("all")}
                        className={`px-3 py-1 rounded-full border ${personaView === "all"
                                ? "bg-purple-600 text-white border-purple-600"
                                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                            }`}
                    >
                        All Personas
                    </button>
                    {personas.map((p) => (
                        <button
                            key={p.id}
                            onClick={() => setPersonaView(p.id)}
                            className={`px-3 py-1 rounded-full border ${personaView === p.id
                                    ? "bg-purple-600 text-white border-purple-600"
                                    : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
                                }`}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {filteredPersonas.map((p) => (
                        <div
                            key={p.id}
                            className="rounded-2xl border border-slate-100 bg-slate-50/60 p-4 flex flex-col justify-between"
                        >
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-xl bg-gradient-to-br from-purple-400 to-teal-400">
                                            <Users className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-semibold text-slate-900">
                                                {p.name}
                                            </p>
                                            <p className="text-xs text-slate-500">{p.label}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-slate-500">
                                        <TrendingUp className="w-3 h-3" />
                                        <span className="font-semibold text-slate-900">
                                            {p.share}%
                                        </span>{" "}
                                        of users
                                    </div>
                                </div>

                                <div className="mt-3 space-y-1 text-xs text-slate-600">
                                    <p>
                                        Age range：<span className="text-slate-900">{p.ageRange}</span>
                                    </p>
                                    <p>
                                        Skin type：<span className="text-slate-900">{p.skinTypes}</span>
                                    </p>
                                    <p>
                                        Key concerns：
                                        <span className="text-slate-900">
                                            {" "}
                                            {p.keyConcerns.join(" · ")}
                                        </span>
                                    </p>
                                    <p>
                                        Favorite products：
                                        <span className="text-slate-900">
                                            {" "}
                                            {p.favProducts.join(", ")}
                                        </span>
                                    </p>
                                </div>
                            </div>

                            <p className="mt-4 text-xs text-slate-700 italic border-t border-slate-200 pt-3">
                                {p.quote}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}
export default DemographicsDetailPage;
