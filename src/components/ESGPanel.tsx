import { Leaf, Recycle, Wind } from 'lucide-react';

function ESGPanel() {
  const impacts = [
    {
      icon: <Recycle className="w-5 h-5" />,
      label: 'Packaging Waste Reduced',
      value: '47.3 tons',
      metric: 'vs. full-size equiv.',
      gradient: 'from-green-400 to-emerald-600'
    },
    {
      icon: <Wind className="w-5 h-5" />,
      label: 'Carbon Reduction',
      value: '124 tons',
      metric: 'CO₂ equivalent',
      gradient: 'from-teal-400 to-cyan-600'
    },
    {
      icon: <Leaf className="w-5 h-5" />,
      label: 'Trial Conversion',
      value: '82%',
      metric: 'vs. 34% traditional',
      gradient: 'from-lime-400 to-green-600'
    }
  ];

  return (
    <div className="relative group h-full">
      <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-teal-400/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all"></div>
      <div className="relative bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/50 h-full flex flex-col">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-gradient-to-br from-green-400 to-teal-600 rounded-xl">
            <Leaf className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-800">ESG Impact</h2>
            <p className="text-slate-600 text-sm">Sustainability metrics</p>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          {impacts.map((impact, index) => (
            <div key={index} className="bg-gradient-to-br from-white to-slate-50/50 rounded-xl p-5 border border-slate-200/50">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${impact.gradient} shadow-lg`}>
                  <div className="text-white">{impact.icon}</div>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-slate-600 font-medium mb-1">{impact.label}</p>
                  <p className="text-3xl font-bold text-slate-800 mb-1">{impact.value}</p>
                  <p className="text-xs text-slate-500">{impact.metric}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200">
          <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-4">
            <p className="text-sm font-semibold text-slate-700 mb-2">Sustainability Score</p>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-3 bg-white rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-green-400 to-teal-600 rounded-full" style={{ width: '89%' }}></div>
              </div>
              <span className="text-2xl font-bold text-slate-800">89/100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ESGPanel;
