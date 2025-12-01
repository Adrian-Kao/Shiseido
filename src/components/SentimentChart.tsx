import { Sparkles } from 'lucide-react';

function SentimentChart() {
  const sentiments = [
    { label: 'Positive', value: 68, color: 'from-green-400 to-emerald-500', percentage: 68 },
    { label: 'Neutral', value: 24, color: 'from-blue-400 to-cyan-500', percentage: 24 },
    { label: 'Negative', value: 8, color: 'from-rose-400 to-red-500', percentage: 8 },
  ];

  const keywords = [
    { word: 'silky', size: 'text-3xl', opacity: 'opacity-90' },
    { word: 'glowing', size: 'text-2xl', opacity: 'opacity-80' },
    { word: 'hydrating', size: 'text-4xl', opacity: 'opacity-100' },
    { word: 'luxurious', size: 'text-2xl', opacity: 'opacity-75' },
    { word: 'refreshing', size: 'text-3xl', opacity: 'opacity-85' },
    { word: 'gentle', size: 'text-2xl', opacity: 'opacity-70' },
    { word: 'effective', size: 'text-4xl', opacity: 'opacity-95' },
    { word: 'smooth', size: 'text-2xl', opacity: 'opacity-80' },
    { word: 'radiant', size: 'text-3xl', opacity: 'opacity-90' },
    { word: 'nourishing', size: 'text-2xl', opacity: 'opacity-75' },
  ];

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
      <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-teal-400 to-purple-500 rounded-xl">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">AI Sentiment Analysis</h2>
            <p className="text-slate-600 text-sm">NLP-powered feedback insights</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <div className="relative h-48 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                {sentiments.map((sentiment, index) => {
                  const previousValues = sentiments.slice(0, index).reduce((sum, s) => sum + s.value, 0);
                  const startAngle = (previousValues / 100) * 360;
                  const endAngle = ((previousValues + sentiment.value) / 100) * 360;
                  const largeArcFlag = sentiment.value > 50 ? 1 : 0;

                  const startX = 100 + 70 * Math.cos((startAngle * Math.PI) / 180);
                  const startY = 100 + 70 * Math.sin((startAngle * Math.PI) / 180);
                  const endX = 100 + 70 * Math.cos((endAngle * Math.PI) / 180);
                  const endY = 100 + 70 * Math.sin((endAngle * Math.PI) / 180);

                  return (
                    <path
                      key={index}
                      d={`M 100 100 L ${startX} ${startY} A 70 70 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                      className={`fill-current bg-gradient-to-r ${sentiment.color}`}
                      style={{
                        fill: index === 0 ? '#10b981' : index === 1 ? '#3b82f6' : '#ef4444',
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
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${sentiment.color}`}></div>
                    <span className="text-sm font-medium text-slate-700">{sentiment.label}</span>
                  </div>
                  <span className="text-sm font-bold text-slate-800">{sentiment.percentage}%</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-50 to-purple-50/30 rounded-xl p-6 flex flex-wrap items-center justify-center gap-4 content-center">
            {keywords.map((keyword, index) => (
              <span
                key={index}
                className={`${keyword.size} ${keyword.opacity} font-bold bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent hover:scale-110 transition-transform cursor-default`}
              >
                {keyword.word}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SentimentChart;
