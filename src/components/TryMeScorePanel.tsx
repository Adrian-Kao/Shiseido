import { Award, Heart, ShoppingBag, Star } from 'lucide-react';

function TryMeScorePanel() {
  const scores = [
    { label: 'Overall Score', value: 8.6, max: 10, icon: <Award className="w-5 h-5" />, color: 'from-purple-400 to-purple-600' },
    { label: 'Satisfaction', value: 92, max: 100, icon: <Heart className="w-5 h-5" />, color: 'from-pink-400 to-rose-500' },
    { label: 'Repurchase Intent', value: 78, max: 100, icon: <ShoppingBag className="w-5 h-5" />, color: 'from-teal-400 to-teal-600' },
    { label: 'Recommendation', value: 85, max: 100, icon: <Star className="w-5 h-5" />, color: 'from-amber-400 to-orange-500' },
  ];

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-teal-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
      <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-purple-400 to-teal-500 rounded-xl">
            <Award className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">TryMe Score Overview</h2>
            <p className="text-slate-600 text-sm">Consumer sentiment & intent metrics</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {scores.map((score, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${score.color}`}>
                    <div className="text-white">{score.icon}</div>
                  </div>
                  <span className="font-semibold text-slate-700">{score.label}</span>
                </div>
                <span className="text-2xl font-bold text-slate-800">
                  {score.value}{score.max === 100 ? '%' : '/10'}
                </span>
              </div>
              <div className="relative h-3 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${score.color} rounded-full transition-all duration-1000 shadow-lg`}
                  style={{ width: `${(score.value / score.max) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-600">Industry Benchmark</span>
            <span className="font-semibold text-slate-700">7.2/10</span>
          </div>
          <div className="mt-2 flex items-center gap-2 text-sm">
            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-400 to-teal-500 rounded-full" style={{ width: '72%' }}></div>
            </div>
            <span className="text-green-600 font-semibold">+19% above average</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TryMeScorePanel;
