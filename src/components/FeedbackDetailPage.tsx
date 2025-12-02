import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Star, Filter, Smile, Frown } from "lucide-react";

type MetricScore = {
  name: string;
  score: number; // 0–100
  benchmark?: number; // 可選，跟同類平均比
};

type Review = {
  id: string;
  user: string;
  market: string;
  date: string;
  sentiment: "positive" | "neutral" | "negative";
  highlightTags: string[];
  text: string;
};

type ProductFeedback = {
  id: string;
  name: string;
  category: "makeup-remover" | "cleanser" | "serum" | "mask" | "cream";
  tryMeScore: number; // 1–10
  totalReviews: number;
  metrics: MetricScore[];
  reviews: Review[];
};

// ==== 假資料：每個產品的指標 & 評價 ====

const feedbackData: ProductFeedback[] = [
  {
    id: "hydra-glow",
    name: "Hydra Glow Serum",
    category: "serum",
    tryMeScore: 8.9,
    totalReviews: 684,
    metrics: [
      { name: "Hydration", score: 92, benchmark: 86 },
      { name: "Absorption", score: 88, benchmark: 83 },
      { name: "Radiance", score: 85, benchmark: 80 },
      { name: "Stickiness", score: 72, benchmark: 78 }, // 低一點是好事，可以在 demo 時講
    ],
    reviews: [
      {
        id: "r1",
        user: "User 1023",
        market: "Japan",
        date: "2025-10-12",
        sentiment: "positive",
        highlightTags: ["texture", "hydration"],
        text: "Texture is silky and sinks in quickly. My skin stays hydrated until the next morning.",
      },
      {
        id: "r2",
        user: "User 874",
        market: "Taiwan",
        date: "2025-10-10",
        sentiment: "positive",
        highlightTags: ["radiance", "glow"],
        text: "Noticed a healthy glow after about a week of use. Works well under makeup.",
      },
      {
        id: "r3",
        user: "User 552",
        market: "Singapore",
        date: "2025-10-08",
        sentiment: "neutral",
        highlightTags: ["hydration"],
        text: "Hydration is good but I wish it felt a bit lighter in hot weather.",
      },
      {
        id: "r4",
        user: "User 311",
        market: "United States",
        date: "2025-10-05",
        sentiment: "positive",
        highlightTags: ["sensitive-skin"],
        text: "Did not irritate my sensitive skin at all. No redness, which is rare for me.",
      },
    ],
  },
  {
    id: "youth-cream",
    name: "Youth Revival Cream",
    category: "cream",
    tryMeScore: 8.6,
    totalReviews: 521,
    metrics: [
      { name: "Firmness", score: 89, benchmark: 82 },
      { name: "Hydration", score: 90, benchmark: 85 },
      { name: "Richness", score: 78, benchmark: 80 },
      { name: "Fine Lines", score: 83, benchmark: 79 },
    ],
    reviews: [
      {
        id: "r1",
        user: "User 930",
        market: "Japan",
        date: "2025-10-09",
        sentiment: "positive",
        highlightTags: ["firmness", "texture"],
        text: "Skin feels bouncier in the morning, and the texture is rich without being greasy.",
      },
      {
        id: "r2",
        user: "User 421",
        market: "Taiwan",
        date: "2025-10-07",
        sentiment: "positive",
        highlightTags: ["hydration"],
        text: "Hydration lasts all night. I wake up with less visible pillow lines.",
      },
      {
        id: "r3",
        user: "User 188",
        market: "United States",
        date: "2025-10-03",
        sentiment: "negative",
        highlightTags: ["richness"],
        text: "Feels a bit too rich for my combination skin. Better for winter use.",
      },
    ],
  },
  {
    id: "cleansing-oil",
    name: "Silky Deep Cleansing Oil",
    category: "makeup-remover",
    tryMeScore: 8.4,
    totalReviews: 437,
    metrics: [
      { name: "Makeup Removal", score: 94, benchmark: 89 },
      { name: "Cleansing Power", score: 91, benchmark: 86 },
      { name: "Eye Comfort", score: 82, benchmark: 80 },
      { name: "Oiliness After Rinse", score: 70, benchmark: 74 },
    ],
    reviews: [
      {
        id: "r1",
        user: "User 612",
        market: "Japan",
        date: "2025-10-11",
        sentiment: "positive",
        highlightTags: ["makeup-removal"],
        text: "Removes waterproof mascara completely with very little rubbing.",
      },
      {
        id: "r2",
        user: "User 299",
        market: "Taiwan",
        date: "2025-10-06",
        sentiment: "positive",
        highlightTags: ["rinse-off"],
        text: "Emulsifies nicely and rinses clean, no heavy film left on the skin.",
      },
      {
        id: "r3",
        user: "User 140",
        market: "Singapore",
        date: "2025-10-04",
        sentiment: "neutral",
        highlightTags: ["eye-comfort"],
        text: "Cleans well but stings slightly if it gets into my eyes.",
      },
    ],
  },
  {
    id: "foam-cleanser",
    name: "Gentle Clean Foam",
    category: "cleanser",
    tryMeScore: 8.2,
    totalReviews: 399,
    metrics: [
      { name: "Cleansing Power", score: 88, benchmark: 84 },
      { name: "Foaminess", score: 91, benchmark: 87 },
      { name: "Tightness After Wash", score: 68, benchmark: 72 }, // 越低越好
      { name: "Gentleness", score: 86, benchmark: 82 },
    ],
    reviews: [
      {
        id: "r1",
        user: "User 507",
        market: "Japan",
        date: "2025-10-10",
        sentiment: "positive",
        highlightTags: ["gentleness"],
        text: "Very gentle but still feels clean. No squeaky tight feeling.",
      },
      {
        id: "r2",
        user: "User 220",
        market: "Taiwan",
        date: "2025-10-08",
        sentiment: "positive",
        highlightTags: ["foaminess"],
        text: "Foams up quickly, a small amount is enough for the whole face.",
      },
      {
        id: "r3",
        user: "User 044",
        market: "United States",
        date: "2025-10-02",
        sentiment: "neutral",
        highlightTags: ["cleansing"],
        text: "Cleans well but doesn’t remove heavier sunscreen on its own.",
      },
    ],
  },

  // ===== 新增：對應 SentimentChart Keyword Focus 的產品 =====

  {
    id: "deep-toner",
    name: "Deep Aqua Moist Toner",
    // 沒有 toner 類別就先歸到 serum，主要是給文案用
    category: "serum",
    tryMeScore: 9.1,
    totalReviews: 312,
    metrics: [
      { name: "Layering Comfort", score: 91, benchmark: 86 },
      { name: "Hydration Longevity", score: 89, benchmark: 84 },
      { name: "Stickiness", score: 75, benchmark: 79 },
      { name: "Glow Boost", score: 87, benchmark: 82 },
    ],
    reviews: [
      {
        id: "r1",
        user: "User 581",
        market: "Taiwan",
        date: "2025-09-05",
        sentiment: "positive",
        highlightTags: ["hydrating", "radiant"],
        text: "Layers well using the 7-skin method, skin looks plump and radiant.",
      },
      {
        id: "r2",
        user: "User 990",
        market: "Japan",
        date: "2025-09-01",
        sentiment: "positive",
        highlightTags: ["absorption", "non-sticky"],
        text: "Absorbs quickly and doesn't feel sticky even in humid weather.",
      },
      {
        id: "r3",
        user: "User 433",
        market: "Singapore",
        date: "2025-08-29",
        sentiment: "neutral",
        highlightTags: ["texture"],
        text: "Texture is a bit thicker than I expected but still comfortable in the evening routine.",
      },
    ],
  },
  {
    id: "sleep-gel",
    name: "Hydro-Boost Sleeping Gel",
    category: "cream",
    tryMeScore: 9.0,
    totalReviews: 275,
    metrics: [
      { name: "Overnight Hydration", score: 93, benchmark: 87 },
      { name: "Cooling Feeling", score: 90, benchmark: 84 },
      { name: "Oil Control in Morning", score: 85, benchmark: 80 },
      { name: "Pillow Transfer", score: 74, benchmark: 78 },
    ],
    reviews: [
      {
        id: "r1",
        user: "User 402",
        market: "Singapore",
        date: "2025-08-28",
        sentiment: "positive",
        highlightTags: ["refreshing", "cooling"],
        text: "Cooling gel texture is perfect for hot nights, I wake up less oily.",
      },
      {
        id: "r2",
        user: "User 777",
        market: "Thailand",
        date: "2025-08-26",
        sentiment: "positive",
        highlightTags: ["glow", "hydrating"],
        text: "Skin feels bouncy and well-rested in the morning, love the glow.",
      },
      {
        id: "r3",
        user: "User 118",
        market: "Japan",
        date: "2025-08-22",
        sentiment: "neutral",
        highlightTags: ["fragrance"],
        text: "Hydration is great but I wish there was a fragrance-free version.",
      },
    ],
  },
  {
    id: "repair-balm",
    name: "Ultra Moist Repair Balm",
    category: "cream",
    tryMeScore: 8.7,
    totalReviews: 241,
    metrics: [
      { name: "Dry Patch Repair", score: 95, benchmark: 88 },
      { name: "Barrier Support", score: 92, benchmark: 86 },
      { name: "Comfort on Sensitive Areas", score: 90, benchmark: 84 },
      { name: "Makeup Compatibility", score: 78, benchmark: 80 },
    ],
    reviews: [
      {
        id: "r1",
        user: "User 130",
        market: "Japan",
        date: "2025-08-20",
        sentiment: "positive",
        highlightTags: ["nourishing", "effective"],
        text: "Saved my dry patches around the nose, very nourishing but not heavy.",
      },
      {
        id: "r2",
        user: "User 668",
        market: "Taiwan",
        date: "2025-08-18",
        sentiment: "positive",
        highlightTags: ["gentle", "soothing"],
        text: "I only use a tiny amount at night and it keeps my skin calm.",
      },
      {
        id: "r3",
        user: "User 355",
        market: "Hong Kong",
        date: "2025-08-15",
        sentiment: "neutral",
        highlightTags: ["richness"],
        text: "Great for targeted areas but too rich for full-face use in summer.",
      },
    ],
  },
  {
    id: "cloud-essence",
    name: "Cloud Dew Essence",
    category: "serum",
    tryMeScore: 9.0,
    totalReviews: 198,
    metrics: [
      { name: "Lightweight Feel", score: 94, benchmark: 88 },
      { name: "Glow Boost", score: 88, benchmark: 83 },
      { name: "Layering Ease", score: 90, benchmark: 85 },
      { name: "Hydration", score: 86, benchmark: 82 },
    ],
    reviews: [
      {
        id: "r1",
        user: "User 509",
        market: "Hong Kong",
        date: "2025-08-10",
        sentiment: "positive",
        highlightTags: ["radiant", "lightweight"],
        text: "Lightweight essence that gives a subtle glow, layers well under serum.",
      },
      {
        id: "r2",
        user: "User 911",
        market: "Singapore",
        date: "2025-08-08",
        sentiment: "positive",
        highlightTags: ["smooth", "luxurious"],
        text: "Feels like a cloud on the skin, absorbs fast and leaves no film.",
      },
      {
        id: "r3",
        user: "User 244",
        market: "Taiwan",
        date: "2025-08-06",
        sentiment: "neutral",
        highlightTags: ["hydration"],
        text: "Nice daily essence, though the hydration is more of a supporting step than a main moisturizer.",
      },
    ],
  },
];

function sentimentIcon(s: Review["sentiment"]) {
  if (s === "positive") {
    return <Smile className="w-4 h-4 text-emerald-500" />;
  }
  if (s === "negative") {
    return <Frown className="w-4 h-4 text-rose-500" />;
  }
  return <MessageCircle className="w-4 h-4 text-slate-400" />;
}

export default function FeedbackDetailPage() {
  const [selectedProduct, setSelectedProduct] = useState<ProductFeedback>(
    feedbackData[0]
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Link to="/" className="text-sm text-slate-500 underline">
        ← Back to Dashboard
      </Link>

      <h2 className="mt-4 text-2xl font-semibold mb-2">
        Feedback – Product Detail
      </h2>
      <p className="text-slate-600 mb-8">
        檢視各產品線的試用回饋，左側為文字評價、右側為多維度分數。
        不同產品根據類型會顯示不同的評分指標（例如卸妝力度、清潔力、保濕度等）。
      </p>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* 左邊：產品列表 */}
        <div className="rounded-2xl bg-white p-6 shadow-sm xl:col-span-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">
              Product List
            </h3>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Filter className="w-3 h-3" />
              Click to select
            </div>
          </div>

          <div className="space-y-3">
            {feedbackData.map((p) => {
              const isActive = p.id === selectedProduct.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedProduct(p)}
                  className={`w-full text-left rounded-xl border px-4 py-3 transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-teal-50 to-purple-50 border-teal-200 shadow-sm"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <div className="pr-2">
                      <p className="font-medium text-slate-800 truncate">
                        {p.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {p.totalReviews} text reviews
                      </p>
                    </div>
                    <div className="flex items-center gap-1 whitespace-nowrap">
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                      <span className="text-sm font-semibold text-slate-800">
                        {p.tryMeScore.toFixed(1)}
                      </span>
                    </div>
                  </div>
                  <div className="h-1.5 w-full bg-slate-100 rounded-full">
                    <div
                      className="h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-teal-500"
                      style={{ width: `${p.tryMeScore * 10}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 右側：選取產品的詳細 */}
        <div className="rounded-2xl bg-white p-6 shadow-sm xl:col-span-2 flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">
                {selectedProduct.name}
              </h3>
            </div>
            <div className="flex gap-4">
              <div className="text-right">
                <p className="text-xs text-slate-500">TryMe Score</p>
                <p className="text-xl font-semibold text-slate-900 flex items-center gap-1 justify-end">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  {selectedProduct.tryMeScore.toFixed(1)}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500">Text Reviews</p>
                <p className="text-xl font-semibold text-slate-900">
                  {selectedProduct.totalReviews}
                </p>
              </div>
            </div>
          </div>

          {/* 兩欄：文字評價 + 指標分數 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
            {/* A. 文字評價 */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-semibold text-slate-900">
                  User Reviews
                </h4>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <MessageCircle className="w-4 h-4" />
                  Sample text feedback
                </div>
              </div>

              <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
                {selectedProduct.reviews.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-xl bg-white border border-slate-100 p-3 shadow-[0_1px_2px_rgba(15,23,42,0.04)]"
                  >
                    <div className="flex justify-between items-center mb-1">
                      <div className="flex items-center gap-2">
                        {sentimentIcon(r.sentiment)}
                        <p className="text-xs font-medium text-slate-700">
                          {r.user} · {r.market}
                        </p>
                      </div>
                      <p className="text-[11px] text-slate-400">{r.date}</p>
                    </div>
                    <p className="text-sm text-slate-800 mb-2">{r.text}</p>
                    <div className="flex flex-wrap gap-1">
                      {r.highlightTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-600"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* B. 指標分數 */}
            <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200">
              <h4 className="text-sm font-semibold text-slate-900 mb-2">
                Feedback Metrics
              </h4>
              <p className="text-xs text-slate-600 mb-3">
                依產品類型顯示不同評分維度。
                例如卸妝油會著重「卸妝力 / 清潔力 / 眼周舒適度」，洗面乳則強調「清潔力 / 起泡度 / 緊繃感」。
              </p>

              <div className="space-y-3">
                {selectedProduct.metrics.map((m) => {
                  const width = `${m.score}%`;
                  const diff =
                    m.benchmark !== undefined
                      ? m.score - m.benchmark
                      : undefined;
                  return (
                    <div key={m.name}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-medium text-slate-700">
                          {m.name}
                        </span>
                        <span className="text-slate-700">
                          {m.score}
                          <span className="text-[11px] text-slate-400">
                            /100
                          </span>
                        </span>
                      </div>
                      <div className="h-2 w-full bg-slate-200 rounded-full">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-teal-500"
                          style={{ width }}
                        />
                      </div>
                      {diff !== undefined && (
                        <p className="text-[11px] text-slate-500 mt-1">
                          vs category avg:{" "}
                          <span
                            className={
                              diff > 0
                                ? "text-emerald-600"
                                : diff < 0
                                ? "text-rose-600"
                                : "text-slate-600"
                            }
                          >
                            {diff > 0 ? "+" : ""}
                            {diff.toFixed(1)}
                          </span>
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
