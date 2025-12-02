import { useState } from "react";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

type Sentiment = {
  label: string;
  value: number;
  color: string;
  percentage: number;
};

type ProductHit = {
  name: string;
  line: string;
  score: number; // 1–10 分
  mentions: number;
};

type Keyword = {
  word: string;
  size: string;
  opacity: string;
  products: ProductHit[];
};

const sentiments: Sentiment[] = [
  {
    label: "Positive",
    value: 68,
    color: "from-green-400 to-emerald-500",
    percentage: 68,
  },
  {
    label: "Neutral",
    value: 24,
    color: "from-blue-400 to-cyan-500",
    percentage: 24,
  },
  {
    label: "Negative",
    value: 8,
    color: "from-rose-400 to-red-500",
    percentage: 8,
  },
];

// demo 假資料：每個關鍵字對應到的產品與分數
const keywords: Keyword[] = [
  {
    word: "hydrating",
    size: "text-5xl",
    opacity: "opacity-100",
    products: [
      { name: "Hydra Glow Serum", line: "Serum", score: 9.4, mentions: 188 },
      { name: "Gentle Clean Foam", line: "Cleanser", score: 8.9, mentions: 97 },
      { name: "Deep Aqua Moist Toner", line: "Toner", score: 9.1, mentions: 120 },
      { name: "Hydro-Boost Sleeping Gel", line: "Gel Cream", score: 9.0, mentions: 86 },
      { name: "Ultra Moist Repair Balm", line: "Balm", score: 8.8, mentions: 63 },
      { name: "Cloud Dew Essence", line: "Essence", score: 9.3, mentions: 104 },
    ],
  },
  {
    word: "effective",
    size: "text-5xl",
    opacity: "opacity-95",
    products: [
      { name: "Youth Revival Cream", line: "Cream", score: 9.3, mentions: 119 },
      { name: "Hydra Glow Serum", line: "Serum", score: 9.1, mentions: 88 },
      { name: "Retinol Renew Night Serum", line: "Serum", score: 9.2, mentions: 147 },
      { name: "BrightC Radiance Booster", line: "Essence", score: 9.0, mentions: 134 },
      { name: "FirmLift Sculpting Mask", line: "Mask", score: 8.7, mentions: 91 },
      { name: "Peptide+ Repair Lotion", line: "Lotion", score: 8.9, mentions: 73 },
    ],
  },
  {
    word: "silky",
    size: "text-4xl",
    opacity: "opacity-90",
    products: [
      { name: "Hydra Glow Serum", line: "Serum", score: 9.2, mentions: 124 },
      { name: "Radiance Boost Mask", line: "Mask", score: 8.7, mentions: 86 },
      { name: "Silk Touch Oil Cleanser", line: "Cleanser", score: 8.9, mentions: 74 },
      { name: "Velvet Finish Day Cream", line: "Cream", score: 8.6, mentions: 38 },
      { name: "SoftSilk Smooth Primer", line: "Primer", score: 9.0, mentions: 69 },
      { name: "FeatherTouch Serum Mist", line: "Mist", score: 9.1, mentions: 58 },
    ],
  },
  {
    word: "refreshing",
    size: "text-4xl",
    opacity: "opacity-90",
    products: [
      { name: "Gentle Clean Foam", line: "Cleanser", score: 8.8, mentions: 103 },
      { name: "Radiance Boost Mask", line: "Mask", score: 8.6, mentions: 55 },
      { name: "MintBurst Splash Toner", line: "Toner", score: 9.1, mentions: 112 },
      { name: "Airy Fresh Day Gel", line: "Gel Cream", score: 8.9, mentions: 84 },
      { name: "CoolWave Essence Mist", line: "Mist", score: 8.7, mentions: 66 },
    ],
  },
  {
    word: "radiant",
    size: "text-4xl",
    opacity: "opacity-95",
    products: [
      { name: "Radiance Boost Mask", line: "Mask", score: 9.2, mentions: 101 },
      { name: "Vitamin C Brightener", line: "Essence", score: 8.7, mentions: 59 },
      { name: "LumiAura Glow Drop", line: "Serum", score: 9.0, mentions: 88 },
      { name: "PearlTone Day Lotion", line: "Lotion", score: 8.8, mentions: 74 },
      { name: "GlowShot Ampoule", line: "Ampoule", score: 9.1, mentions: 63 },
    ],
  },
  {
    word: "glowing",
    size: "text-3xl",
    opacity: "opacity-80",
    products: [
      { name: "Radiance Boost Mask", line: "Mask", score: 9.0, mentions: 132 },
      { name: "Vitamin C Brightener", line: "Essence", score: 8.5, mentions: 64 },
      { name: "GlowShot Ampoule", line: "Ampoule", score: 9.1, mentions: 52 },
    ],
  },
  {
    word: "luxurious",
    size: "text-3xl",
    opacity: "opacity-80",
    products: [
      { name: "Youth Revival Cream", line: "Cream", score: 9.1, mentions: 72 },
      { name: "Gold Infusion Essence", line: "Essence", score: 9.3, mentions: 56 },
    ],
  },
  {
    word: "gentle",
    size: "text-3xl",
    opacity: "opacity-70",
    products: [
      { name: "Gentle Clean Foam", line: "Cleanser", score: 9.0, mentions: 141 },
      { name: "CalmRelief Repair Cream", line: "Cream", score: 9.2, mentions: 94 },
    ],
  },
  {
    word: "smooth",
    size: "text-3xl",
    opacity: "opacity-80",
    products: [
      { name: "Hydra Glow Serum", line: "Serum", score: 9.0, mentions: 64 },
      { name: "SilkTouch Primer", line: "Primer", score: 8.8, mentions: 58 },
    ],
  },
  {
    word: "nourishing",
    size: "text-3xl",
    opacity: "opacity-75",
    products: [
      { name: "Youth Revival Cream", line: "Cream", score: 9.1, mentions: 83 },
      { name: "Repair+ Recovery Balm", line: "Balm", score: 9.0, mentions: 67 },
    ],
  },
];
function SentimentChart() {
  // 預設選 hydrating，如果沒有就選第一個
  const [selectedKeyword, setSelectedKeyword] = useState<Keyword | null>(
    keywords.find((k) => k.word === "hydrating") ?? keywords[0]
  );

  const totalMentionsOfKeyword =
    selectedKeyword?.products.reduce((sum, p) => sum + p.mentions, 0) ?? 0;

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
      <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50">
        {/* 標題列 */}
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-teal-400 to-purple-500 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">
              AI Sentiment Analysis
            </h2>
            <p className="text-slate-600 text-sm">
              NLP-powered feedback insights
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          {/* 左側：圓餅圖 + 數據比例 */}
          <div>
            <div className="relative h-80 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                {sentiments.map((sentiment, index) => {
                  const previousValues = sentiments
                    .slice(0, index)
                    .reduce((sum, s) => sum + s.value, 0);
                  const startAngle = (previousValues / 100) * 360;
                  const endAngle =
                    ((previousValues + sentiment.value) / 100) * 360;
                  const largeArcFlag = sentiment.value > 50 ? 1 : 0;

                  const startX =
                    100 + 70 * Math.cos((startAngle * Math.PI) / 180);
                  const startY =
                    100 + 70 * Math.sin((startAngle * Math.PI) / 180);
                  const endX =
                    100 + 70 * Math.cos((endAngle * Math.PI) / 180);
                  const endY =
                    100 + 70 * Math.sin((endAngle * Math.PI) / 180);

                  return (
                    <path
                      key={index}
                      d={`M 100 100 L ${startX} ${startY} A 70 70 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                      style={{
                        fill:
                          index === 0
                            ? "#10b981"
                            : index === 1
                              ? "#3b82f6"
                              : "#ef4444",
                      }}
                    />
                  );
                })}
                <circle cx="100" cy="100" r="45" fill="white" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <div className="text-4xl font-bold text-slate-800">68%</div>
                <div className="text-sm text-slate-600">Positive</div>
              </div>
            </div>

            <div className="space-y-3 mt-6">
              {sentiments.map((sentiment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full bg-gradient-to-r ${sentiment.color}`}
                    ></div>
                    <span className="text-lg font-medium text-slate-700">
                      {sentiment.label}
                    </span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">
                    {sentiment.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 右側：關鍵字雲 + 產品列表 */}
          <div className="flex flex-col gap-4">
            {/* 關鍵字雲 */}
            <div className="bg-gradient-to-br from-slate-50 to-purple-50/30 rounded-xl p-6 flex flex-wrap items-center justify-center gap-4 content-center">
              {keywords.map((keyword) => {
                const isActive =
                  selectedKeyword && selectedKeyword.word === keyword.word;
                return (
                  <button
                    key={keyword.word}
                    type="button"
                    onClick={() => setSelectedKeyword(keyword)}
                    className={`
                      ${keyword.size} ${keyword.opacity}
                      font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent
                      hover:scale-110 transition-transform
                      ${isActive ? "drop-shadow-lg underline" : ""}
                    `}
                  >
                    {keyword.word}
                  </button>
                );
              })}
            </div>

            {/* Keyword Focus + 產品滑動清單 */}
            <div className="bg-white/80 rounded-xl border border-slate-100 p-4 shadow-sm">
              {selectedKeyword ? (
                <>
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-slate-500">
                        KEYWORD FOCUS
                      </p>
                      <p className="text-lg font-semibold text-slate-900">
                        “{selectedKeyword.word}”
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">
                        Total mentions
                      </p>
                      <p className="text-sm font-semibold text-slate-800">
                        {totalMentionsOfKeyword}
                      </p>
                    </div>
                  </div>

                  <div className="mt-1 max-h-44 md:max-h-56 overflow-y-auto divide-y divide-slate-100 pr-1">
                    {selectedKeyword.products.map((p) => (
                      <Link
                        key={p.name}
                        to={`/feedback?product=${encodeURIComponent(p.name)}`}
                        className="py-2 flex items-center justify-between hover:bg-slate-50 px-1 rounded-md transition-colors cursor-pointer"
                      >
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            {p.name}
                          </p>
                          <p className="text-xs text-slate-500">{p.line}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-emerald-600">
                            {p.score.toFixed(1)}/10
                          </p>
                          <p className="text-xs text-slate-500">
                            {p.mentions} mentions
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <p className="text-xs text-slate-500 text-center">
                  點選上方的關鍵字，查看哪些產品最常被用「這個形容詞」來評價，並可進一步查看詳細
                  feedback。
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SentimentChart;
