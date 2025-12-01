import { Activity } from 'lucide-react';

function ActivityTimeline() {
  const timeData = [
    { day: 'Mon', trials: 3420, feedback: 2890, completion: 85 },
    { day: 'Tue', trials: 3680, feedback: 3120, completion: 87 },
    { day: 'Wed', trials: 4120, feedback: 3590, completion: 89 },
    { day: 'Thu', trials: 3890, feedback: 3280, completion: 86 },
    { day: 'Fri', trials: 4350, feedback: 3820, completion: 91 },
    { day: 'Sat', trials: 2960, feedback: 2450, completion: 82 },
    { day: 'Sun', trials: 2780, feedback: 2340, completion: 84 }
  ];

  const maxTrials = Math.max(...timeData.map(d => d.trials));

  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-400/20 to-purple-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
      <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-teal-400 to-purple-500 rounded-xl">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Activity Timeline</h2>
            <p className="text-slate-600 text-sm">Weekly trial behavior & engagement</p>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-700">Trial Starts</span>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-purple-600"></div>
                  <span className="text-slate-600">Trials</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-teal-400 to-teal-600"></div>
                  <span className="text-slate-600">Feedback</span>
                </div>
              </div>
            </div>
            <div className="relative h-48">
              <div className="absolute inset-0 flex items-end justify-between gap-2">
                {timeData.map((data, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full flex flex-col items-center gap-1">
                      <div className="w-full flex justify-center gap-1">
                        <div className="relative group/bar w-1/2">
                          <div
                            className="bg-gradient-to-t from-purple-400 to-purple-600 rounded-t-lg transition-all duration-500 hover:scale-105"
                            style={{ height: `${(data.trials / maxTrials) * 180}px` }}
                          ></div>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                            {data.trials.toLocaleString()}
                          </div>
                        </div>
                        <div className="relative group/bar w-1/2">
                          <div
                            className="bg-gradient-to-t from-teal-400 to-teal-600 rounded-t-lg transition-all duration-500 hover:scale-105"
                            style={{ height: `${(data.feedback / maxTrials) * 180}px` }}
                          ></div>
                          <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap">
                            {data.feedback.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-slate-600">{data.day}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-200">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-slate-700">Completion Rate Trend</span>
            </div>
            <div className="relative h-24">
              <svg viewBox="0 0 700 100" className="w-full h-full">
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#14B8A6" />
                  </linearGradient>
                  <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#14B8A6" stopOpacity="0.05" />
                  </linearGradient>
                </defs>
                {timeData.map((data, index) => {
                  const x = (index / (timeData.length - 1)) * 700;
                  const y = 100 - data.completion;
                  return (
                    <circle
                      key={index}
                      cx={x}
                      cy={y}
                      r="4"
                      fill="url(#lineGradient)"
                      className="hover:r-6 transition-all cursor-pointer"
                    />
                  );
                })}
                <path
                  d={`M ${timeData.map((data, index) => {
                    const x = (index / (timeData.length - 1)) * 700;
                    const y = 100 - data.completion;
                    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')}`}
                  fill="none"
                  stroke="url(#lineGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d={`M ${timeData.map((data, index) => {
                    const x = (index / (timeData.length - 1)) * 700;
                    const y = 100 - data.completion;
                    return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
                  }).join(' ')} L 700 100 L 0 100 Z`}
                  fill="url(#areaGradient)"
                />
              </svg>
            </div>
            <div className="flex justify-between mt-2">
              {timeData.map((data, index) => (
                <div key={index} className="text-center">
                  <span className="text-xs font-semibold text-slate-800">{data.completion}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityTimeline;
