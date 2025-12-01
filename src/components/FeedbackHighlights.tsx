import { MessageSquare, ThumbsUp } from "lucide-react";
import { Link } from "react-router-dom";

function FeedbackHighlights() {
  const highlights = [
    {
      text: "Incredibly smooth texture that absorbed instantly",
      sentiment: "positive",
      category: "Texture",
      mentions: 342,
    },
    {
      text: "Noticed visible improvement in skin radiance within days",
      sentiment: "positive",
      category: "Efficacy",
      mentions: 289,
    },
    {
      text: "Love the sustainable packaging approach",
      sentiment: "positive",
      category: "Packaging",
      mentions: 267,
    },
    {
      text: "Perfect for sensitive skin, no irritation",
      sentiment: "positive",
      category: "Skin Type",
      mentions: 234,
    },
    {
      text: "Fragrance is subtle and pleasant",
      sentiment: "positive",
      category: "Fragrance",
      mentions: 198,
    },
    {
      text: "Would prefer a larger trial size",
      sentiment: "neutral",
      category: "Product Size",
      mentions: 156,
    },
  ];

  return (
    // 整張卡片變成一個 Link
    <Link to="/feedback" className="block relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-teal-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
      <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 h-full group-hover:translate-y-0.5 transition-transform">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-400 to-teal-500 rounded-xl">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Feedback Highlights
              </h2>
              <p className="text-slate-600 text-sm">
                NLP-extracted key phrases
              </p>
            </div>
          </div>

          {/* 右上提示文字 */}
          <div className="text-xs font-medium text-teal-700 bg-teal-50 px-3 py-1 rounded-full flex items-center gap-1 group-hover:bg-teal-100">
            View all feedback
            <span className="text-[10px]">↗</span>
          </div>
        </div>

        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-slate-50/50 rounded-xl p-4 border border-slate-200/50 hover:shadow-lg transition-all hover:scale-[1.02]"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`p-2 rounded-lg ${
                    highlight.sentiment === "positive"
                      ? "bg-green-100"
                      : highlight.sentiment === "neutral"
                      ? "bg-blue-100"
                      : "bg-rose-100"
                  }`}
                >
                  <ThumbsUp
                    className={`w-4 h-4 ${
                      highlight.sentiment === "positive"
                        ? "text-green-600"
                        : highlight.sentiment === "neutral"
                        ? "text-blue-600"
                        : "text-rose-600"
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-slate-700 font-medium mb-2 leading-relaxed">
                    "{highlight.text}"
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-purple-600 bg-purple-50 px-3 py-1 rounded-full">
                      {highlight.category}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {highlight.mentions} mentions
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default FeedbackHighlights;
