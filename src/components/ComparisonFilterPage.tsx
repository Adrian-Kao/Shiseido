// src/components/ProductComparison.tsx
import { useState, useMemo } from "react";
import { Box, TrendingUp, ArrowUpDown } from "lucide-react";
import { Link } from "react-router-dom";

type ProductRow = {
    id: number;
    name: string;
    category: string;
    trials: number;
    tryMeScore: number; // 1–10
    satisfaction: number; // %
    repurchase: number; // %
    trend: number; // 相較前一期成長 %
};

const productData: ProductRow[] = [
    {
        id: 1,
        name: "Hydra Glow Serum",
        category: "Serum",
        trials: 6842,
        tryMeScore: 8.9,
        satisfaction: 94,
        repurchase: 82,
        trend: 12,
    },
    {
        id: 2,
        name: "Youth Revival Cream",
        category: "Cream",
        trials: 5621,
        tryMeScore: 8.6,
        satisfaction: 91,
        repurchase: 78,
        trend: 8,
    },
    {
        id: 3,
        name: "Radiance Boost Mask",
        category: "Mask",
        trials: 4893,
        tryMeScore: 8.4,
        satisfaction: 89,
        repurchase: 75,
        trend: 15,
    },
    {
        id: 4,
        name: "Gentle Clean Foam",
        category: "Cleanser",
        trials: 4156,
        tryMeScore: 8.2,
        satisfaction: 87,
        repurchase: 71,
        trend: 6,
    },
    {
        id: 5,
        name: "Vitamin C Brightener",
        category: "Serum",
        trials: 3335,
        tryMeScore: 7.8,
        satisfaction: 84,
        repurchase: 68,
        trend: 4,
    },
    {
        id: 6,
        name: "Silky Deep Cleansing Oil",
        category: "Makeup Remover",
        trials: 5210,
        tryMeScore: 8.4,
        satisfaction: 90,
        repurchase: 79,
        trend: 10,
    },
    {
        id: 7,
        name: "Cloud Dew Essence",
        category: "Essence",
        trials: 2988,
        tryMeScore: 9.0,
        satisfaction: 92,
        repurchase: 80,
        trend: 11,
    },
    {
        id: 8,
        name: "Ultra Moist Repair Balm",
        category: "Cream",
        trials: 2475,
        tryMeScore: 8.7,
        satisfaction: 90,
        repurchase: 77,
        trend: 9,
    },
    {
        id: 9,
        name: "Hydro-Boost Sleeping Gel",
        category: "Gel Cream",
        trials: 3821,
        tryMeScore: 9.1,
        satisfaction: 93,
        repurchase: 81,
        trend: 13,
    },
    {
        id: 10,
        name: "Deep Aqua Moist Toner",
        category: "Toner",
        trials: 3560,
        tryMeScore: 8.8,
        satisfaction: 90,
        repurchase: 74,
        trend: 7,
    },
    {
        id: 11,
        name: "Pore Care Clay Mask",
        category: "Mask",
        trials: 2690,
        tryMeScore: 7.9,
        satisfaction: 82,
        repurchase: 65,
        trend: 3,
    },
    {
        id: 12,
        name: "Soothing Green Tea Mist",
        category: "Mist",
        trials: 2314,
        tryMeScore: 8.0,
        satisfaction: 86,
        repurchase: 69,
        trend: 5,
    },
    {
        id: 13,
        name: "Barrier Rescue Lotion",
        category: "Lotion",
        trials: 3120,
        tryMeScore: 8.5,
        satisfaction: 88,
        repurchase: 76,
        trend: 9,
    },
    {
        id: 14,
        name: "Silk Touch Eye Cream",
        category: "Eye Cream",
        trials: 2050,
        tryMeScore: 8.3,
        satisfaction: 87,
        repurchase: 72,
        trend: 6,
    },
    {
        id: 15,
        name: "Daily Defense SPF50",
        category: "Sunscreen",
        trials: 4412,
        tryMeScore: 8.1,
        satisfaction: 85,
        repurchase: 70,
        trend: 5,
    },
    {
        id: 16,
        name: "Oil Control Matte Fluid",
        category: "Emulsion",
        trials: 2975,
        tryMeScore: 7.7,
        satisfaction: 81,
        repurchase: 63,
        trend: 2,
    },
    {
        id: 17,
        name: "Comfort Calming Cleanser",
        category: "Cleanser",
        trials: 3380,
        tryMeScore: 8.3,
        satisfaction: 88,
        repurchase: 73,
        trend: 6,
    },
    {
        id: 18,
        name: "Rose Glow Toner",
        category: "Toner",
        trials: 2544,
        tryMeScore: 8.4,
        satisfaction: 89,
        repurchase: 74,
        trend: 7,
    },
    {
        id: 19,
        name: "Night Repair Ampoule",
        category: "Ampoule",
        trials: 2777,
        tryMeScore: 9.0,
        satisfaction: 92,
        repurchase: 83,
        trend: 14,
    },
    {
        id: 20,
        name: "Gentle Peeling Serum",
        category: "Serum",
        trials: 2219,
        tryMeScore: 7.9,
        satisfaction: 83,
        repurchase: 66,
        trend: 3,
    },
];

type SortKey = "trials" | "tryMeScore" | "satisfaction" | "repurchase" | "trend";

const sortOptions: { value: SortKey; label: string }[] = [
    { value: "tryMeScore", label: "TryMe Score" },
    { value: "satisfaction", label: "Satisfaction" },
    { value: "repurchase", label: "Repurchase" },
    { value: "trials", label: "Trials" },
    { value: "trend", label: "Trend" },
];

function ProductComparison() {

    const [sortBy, setSortBy] = useState<SortKey>("tryMeScore");
    const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");


    const sortedProducts = useMemo(() => {
        const data = [...productData];
        data.sort((a, b) => {
            const av = a[sortBy];
            const bv = b[sortBy];
            if (av === bv) return 0;
            if (sortOrder === "desc") return bv > av ? 1 : -1;
            return av > bv ? 1 : -1;
        });
        return data;
    }, [sortBy, sortOrder]);

    const toggleOrder = () =>
        setSortOrder((prev) => (prev === "desc" ? "asc" : "desc"));

    return (
    <div className="min-h-screen bg-slate-50 p-8">
        <Link to="/" className="text-sm text-slate-500 underline">
            ← Back to Dashboard
        </Link>
        <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-400/15 to-teal-400/15 rounded-2xl blur-xl group-hover:blur-2xl transition-all" />
            <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-teal-500 rounded-xl">
                            <Box className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">
                                Product-Level Comparison
                            </h2>
                            <p className="text-slate-600 text-sm">
                                Performance metrics across product line
                            </p>
                        </div>
                    </div>

                    {/* Sort controls */}
                    <div className="flex items-center gap-3">
                        <label className="text-xs font-medium text-slate-500">
                            Sort by
                        </label>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as SortKey)}
                            className="text-sm rounded-lg border border-slate-200 bg-white px-3 py-1.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400/60"
                        >
                            {sortOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                        <button
                            type="button"
                            onClick={toggleOrder}
                            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 shadow-sm hover:bg-slate-50"
                        >
                            <ArrowUpDown className="w-4 h-4" />
                            {sortOrder === "desc" ? "High → Low" : "Low → High"}
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm">
                        <thead className="border-b border-slate-200 text-slate-500">
                            <tr>
                                <th className="py-3 pr-4 text-left w-20">#</th>
                                <th className="py-3 pr-4 text-left">Product Name</th>
                                <th className="py-3 px-4 text-right">Trials</th>
                                <th className="py-3 px-4 text-right">TryMe Score</th>
                                <th className="py-3 px-4 text-left">Satisfaction</th>
                                <th className="py-3 px-4 text-left">Repurchase</th>
                                <th className="py-3 pl-4 text-right">Trend</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedProducts.map((p, index) => (
                                <tr
                                    key={p.id}
                                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60 transition-colors"
                                >
                                    {/* Rank */}
                                    <td className="py-4 pr-4">
                                        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-teal-500 text-sm font-semibold text-white shadow-sm">
                                            {index + 1}
                                        </div>
                                    </td>

                                    {/* Product name */}
                                    <td className="py-4 pr-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-slate-900">
                                                {p.name}
                                            </span>
                                            <span className="text-xs text-slate-500">
                                                {p.category}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Trials */}
                                    <td className="py-4 px-4 text-right tabular-nums text-slate-800">
                                        {p.trials.toLocaleString()}
                                    </td>

                                    {/* TryMe Score */}
                                    <td className="py-4 px-4 text-right tabular-nums text-slate-800">
                                        <span className="inline-flex items-center justify-end gap-1">
                                            <span className="text-amber-400">★</span>
                                            {p.tryMeScore.toFixed(1)}
                                        </span>
                                    </td>

                                    {/* Satisfaction bar */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 flex-1 rounded-full bg-slate-200">
                                                <div
                                                    className="h-2 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500"
                                                    style={{ width: `${p.satisfaction}%` }}
                                                />
                                            </div>
                                            <span className="w-10 text-right tabular-nums text-slate-800 text-xs">
                                                {p.satisfaction}%
                                            </span>
                                        </div>
                                    </td>

                                    {/* Repurchase bar */}
                                    <td className="py-4 px-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-2 flex-1 rounded-full bg-slate-200">
                                                <div
                                                    className="h-2 rounded-full bg-gradient-to-r from-purple-400 to-teal-500"
                                                    style={{ width: `${p.repurchase}%` }}
                                                />
                                            </div>
                                            <span className="w-10 text-right tabular-nums text-slate-800 text-xs">
                                                {p.repurchase}%
                                            </span>
                                        </div>
                                    </td>

                                    {/* Trend */}
                                    <td className="py-4 pl-4 text-right">
                                        <span
                                            className={`inline-flex items-center justify-end gap-1 rounded-full px-3 py-1 text-xs font-medium ${p.trend >= 0
                                                ? "bg-emerald-50 text-emerald-700"
                                                : "bg-rose-50 text-rose-700"
                                                }`}
                                        >
                                            <TrendingUp className="w-3 h-3" />
                                            {p.trend >= 0 ? "+" : ""}
                                            {p.trend}%
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    );
}

export default ProductComparison;
